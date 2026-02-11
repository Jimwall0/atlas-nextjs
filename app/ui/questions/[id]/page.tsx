import { HashtagIcon } from "@heroicons/react/24/outline";
import { fetchSingleQuestion, } from "@/lib/data";

export default async function Page({ params }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const singleQuestion = await fetchSingleQuestion(id);

    if (!singleQuestion) {
        <>Question not found</>
    }

    return (
        <div>
            <h1 className="text-3xl font-black flex items-center">
                <HashtagIcon className="h-6 w-6 mr-2" /> {singleQuestion.title}
            </h1>
        </div>
    );
}