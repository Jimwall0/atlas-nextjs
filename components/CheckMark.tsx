import {CheckCircleIcon as SolidCheck} from "@heroicons/react/24/solid";
import {CheckCircleIcon as OutlineCheck} from "@heroicons/react/24/outline";
import {useState} from "react";

export function CheckMark({id}: {id: string}){
    const [check, setCheck] = useState(false);
    return (
        <div>
            <button onClick={() => setCheck(!check)}></button>
            {check ? (
                <SolidCheck className="h-6 w-6 text-green-500"/>
            ) : (
                <OutlineCheck className="h-6 w-6 text-gray-400"/>
            )}
        </div>
    )
}