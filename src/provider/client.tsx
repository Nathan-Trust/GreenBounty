/* eslint-disable no-console */
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MyProvider } from "@/context";
import { LayoutProps } from "@/models/shared";
import RootLayout from "@/app/layout";
import { Toaster } from "sonner";

export default function ProvidersClient({ children }: Readonly<LayoutProps>) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: "always",
        refetchOnReconnect: "always",
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error(`Error with query ${query.queryKey}:`, error);
      },
    }),
  });

  return (
    <MyProvider>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RootLayout>{children}</RootLayout>
        <Toaster
          theme="dark"
          position="top-right"
          richColors={true}
          duration={1000}
          toastOptions={{
            classNames: {
              error:
                "bg-[#CA503F] text-[#E0E0E0] border border-none outline-none",
              success:
                "text-green-100 bg-[#0a332d] border border-none outline-none",
              warning: "text-yellow-400",
              info: "bg-blue-400",
              closeButton:
                "bg-red-100 border border-none outline-none  text-red-500",
            },
          }}
        />{" "}
      </QueryClientProvider>
    </MyProvider>
  );
}
