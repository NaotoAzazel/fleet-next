import { getColors } from "@/lib/posts";

export async function GET() {
  const colors = await getColors();
  return new Response(JSON.stringify(colors));
}