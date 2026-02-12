import {insertAnswer} from "@/lib/actions";

export function AnswerQuestion({ question_id }: {question_id: string}){
    return (
        <div>
            <form className="relative my-8" action={insertAnswer}>
                <input type="hidden" name="question_id" value={question_id} className="hidden" />
                <input
                    type="text"
                    name="answer"
                    placeholder="Answer question"
                    className="mt-1 block w-full rounded-md border border-atlas-white-300 bg-inherit py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-3 focus:ring-atlas-teal"
                />
                <button className="absolute right-2 top-2 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary" type="submit">
                    Answer
                </button>
            </form>
        </div>
    )
}