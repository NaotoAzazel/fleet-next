import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { adminIds } from "@/lib/constants";

export async function currentUser(): Promise<any> {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const { data } = await supabase.auth.getSession();
  return data?.session;
}

export function verifyCurrentUserIsAdmin(userId: string | undefined): boolean {
  return adminIds.has(String(userId));
}