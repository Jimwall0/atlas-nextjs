// Define your server actions here
"use server";

import { revalidatePath } from "next/cache";
import { insertTopic, insertQuestion, incrementVotes, insertAnswerToDb, markAnswerAsAccepted } from "./data";
import { redirect } from "next/navigation";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function insertAnswer(data: FormData) {
  try {
    const answer = data.get("answer");
    const question_id = data.get("question_id");

    if (!answer || !question_id) {
      throw new Error("Missing text or question_id");
    }

    await insertAnswerToDb({
      answer: answer.toString(),
      question_id: question_id.toString(),
    });
    revalidatePath(`/ui/questions/${question_id.toString()}`);
  } catch (error) {
    console.error("Failed to add answer", error)
    throw error;
  }
}

export async function acceptAnsweredAction(formData: FormData) {
  const question_id = formData.get("question_id")?.toString();
  const answer_id = formData.get("answer_id")?.toString();
  if (!question_id || !answer_id) {
    throw new Error("Missing quesiont_id or answer_id");
  }
  await markAnswerAsAccepted(question_id, answer_id);
  revalidatePath(`/ui/questions/${question_id}`);
}