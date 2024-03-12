import { getCategories } from "@/lib/posts";

export async function GET() {
  const categories = await getCategories();
  return new Response(JSON.stringify(categories));
}