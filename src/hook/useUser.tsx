"use client"

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query"

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async() => {
      const supabase = supabaseBrowser();
      const { data } = await supabase.auth.getSession();

      if(data.session?.user) return data.session.user;
      else return null;
    },
  });
}
