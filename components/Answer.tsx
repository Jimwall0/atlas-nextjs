"use client"
import { CheckMark } from "@/components/CheckMark";

type AnswersProps = {
  id: string;
  question_id: string;
  answer: string;
  accepted: boolean;
}

export function Answer({id, question_id, answer, accepted = false}: AnswersProps){
    return (
        <div className="flex flex-row justify-between border-atlas-white-300 border text-md">
            <div>
                {answer}
            </div>
            <CheckMark answer_id={id} question_id={question_id} initial={accepted}/>
        </div>
    )
}