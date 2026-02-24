import type { ReactNode } from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: Error) => {
        toast.error(error.message || "Đã xảy ra lỗi");
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
});

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
