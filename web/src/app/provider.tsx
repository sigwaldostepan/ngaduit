import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { queryConfig } from "@/lib/react-query";

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default AppProvider;
