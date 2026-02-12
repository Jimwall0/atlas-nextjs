import { sql } from "@vercel/postgres";
import { Question, Topic, User, Answers } from "./definitions";

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchTopics() {
  try {
    const data = await sql<Topic>`SELECT * FROM topics`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string) {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows && data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchQuestions(id: string) {
  try {
    const data =
      await sql<Question>`SELECT * FROM questions WHERE topic_id = ${id} ORDER BY votes DESC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchSingleQuestion(id: string) {
  try {
    const data =
      await sql<Question>`SELECT * FROM questions WHERE id = ${id}`;
    return data.rows[0] ?? null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("failed to fetch question.");
  }
}

export async function fetchQuestionAnswers(id: string) {
  try {
    const data = 
      await sql<Answers>`SELECT * FROM answers WHERE question_id = ${id}`;
    return data.rows;
  } catch (error) {
    console.error("Failed to fetch answers", error)
    throw new Error("Failed to fetch answers")
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
) {
  try {
    const data =
      await sql<Question>`INSERT INTO questions (title, topic_id, votes) VALUES (${question.title}, ${question.topic_id}, ${question.votes})`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function insertTopic(topic: Pick<Topic, "title">) {
  try {
    const data =
      await sql<Topic>`INSERT INTO topics (title) VALUES (${topic.title}) RETURNING id;`;
    console.log(data.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  }
}

export async function incrementVotes(id: string) {
  try {
    const data =
      await sql<Question>`UPDATE questions SET votes = votes + 1 WHERE id = ${id}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment votes.");
  }
}

export async function insertAnswerToDb(answer: { answer: string; question_id: string}) {
  const data = await sql`
  INSERT INTO answers (answer, question_id)
  Values (${answer.answer}, ${answer.question_id})
  RETURNING *;
  `;
  return data.rows[0];
}

export async function markAnswerAsAccepted(question_id: string, answer_id: string) {
  try {
    await sql`BEGIN`;
    await sql`
    UPDATE answers
    SET accepted = false
    WHERE question_id = ${question_id};
    `;
    const result = await sql`
    UPDATE answers
    SET accepted = true
    WHERE id = ${answer_id}
    RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to mark answer as accepted", error);
    throw new Error("Failed to mark answer a accepted");
  }
}