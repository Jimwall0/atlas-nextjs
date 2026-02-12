import {CheckCircleIcon as SolidCheck} from "@heroicons/react/24/solid";
import {CheckCircleIcon as OutlineCheck} from "@heroicons/react/24/outline";
import {useState} from "react";
import { acceptAnsweredAction } from "@/lib/actions";

type CheckMarkProps = {
    answer_id: string;
    question_id: string;
    initial?: boolean;
}


export function CheckMark({ answer_id, question_id, initial = false }: CheckMarkProps) {
  const [accepted, setAccepted] = useState(initial);

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("answer_id", answer_id);
    formData.append("question_id", question_id);

    await acceptAnsweredAction(formData);
    setAccepted(true);
  };

  return (
    <button onClick={handleClick}>
      {accepted ? (
        <SolidCheck className="h-6 w-6 text-green-500" />
      ) : (
        <OutlineCheck className="h-6 w-6 text-gray-400" />
      )}
    </button>
  );
}
