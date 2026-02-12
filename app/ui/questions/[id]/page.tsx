import { HashtagIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as SolidCheck } from "@heroicons/react/24/solid";
import { CheckCircleIcon as Outline } from "@heroicons/react/24/outline";
import { fetchSingleQuestion, fetchQuestionAnswers } from "@/lib/data";

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
            <form></form>
            {answerlist?.map((answer) => (
                <div key={answer.id} className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b">
                    <p>{answer.text}</p>
                    <button>
                        {answer.check ? (
                            <SolidCheck/>
                        ) : (
                            <Outline/>
                        )}
                    </button>
                </div>
            ))}
        </div>
    );
}
