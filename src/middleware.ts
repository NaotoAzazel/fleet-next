import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { protectedPath, adminIds } from "@/lib/constants";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getSession();
  const url = new URL(request.url);
  const isAuthPage = url.pathname.startsWith("/login");
  const isAuth = !!data.session;

  if(isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if(!isAuth && protectedPath.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/login?auth-required=true", request.url));
  }

  if(
    url.pathname.startsWith("/dashboard") && 
    !adminIds.has(data.session?.user.user_metadata.sub)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/transport:path", "/dashboard/:path*", "/login"],
};