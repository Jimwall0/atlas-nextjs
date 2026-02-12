"use client"
import { CheckMark } from "@/components/CheckMark";

type AnswersProps = {
  id: string;
  question_id: string;
  answer: string;
}

export function Answer({id, question_id, answer}: AnswersProps){
    return (
        <div key={question_id} className="flex flex-row justify-between border-atlas-white-300 border text-md">
            <div>
                {answer}
            </div>
            <CheckMark id={id}/>
        </div>
    )
}