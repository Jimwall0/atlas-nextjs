"use client"
import { CheckMark } from "@/components/CheckMark";

type AnswersProps = {
  id: string;
  question_id: string;
  answer: string;
}

export function Answer({id, question_id, answer}: AnswersProps){
    return (
        <div key={question_id} className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b">
            <div className="mr-2 rounded-xl bg-secondary px-2 text-sm text-white">
                {answer}
            </div>
            <CheckMark id={id}/>
        </div>
    )
}