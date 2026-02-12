import { HashtagIcon } from "@heroicons/react/24/outline";
import { fetchSingleQuestion, fetchQuestionAnswers } from "@/lib/data";
import { Answer } from "@/components/Answer";
import { AnswerQuestion } from "@/components/AnswerQuestion";

export default async function Page({ params }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const singleQuestion = await fetchSingleQuestion(id);
    const answerlist = await fetchQuestionAnswers(id);

    if (!singleQuestion) {
        return <>Question not found</>
    }

    return (
        <div>
            <h1 className="text-3xl font-black flex items-center">
                <HashtagIcon className="h-6 w-6 mr-2" /> {singleQuestion.title}
            </h1>
            <AnswerQuestion text={singleQuestion.id}/>
            {answerlist.map((answers) => (
                <Answer
                key={answers.id}
                id={answers.id}
                question_id={singleQuestion.id}
                answer={answers.answer}
                />
            ))}
        </div>
    );
}
