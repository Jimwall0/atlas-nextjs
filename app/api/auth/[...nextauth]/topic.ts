import { fetchTopics } from "@/lib/data";

export async function GET() {
  try {
    const topics = await fetchTopics();
    const simplifiedTopics = topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
    }));

    return new Response(JSON.stringify(simplifiedTopics), {
      status: 200,
      headers: { "Content-Type": "application/json" }, // fixed
    });
  } catch (error) {
    console.error("Failed to fetch topics:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
