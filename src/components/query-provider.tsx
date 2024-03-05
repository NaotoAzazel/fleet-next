"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  }))
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/** Uncomment if you need to debug the query client */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
