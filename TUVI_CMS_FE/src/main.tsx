import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { scan } from "react-scan"; // must be imported before React and React DOM
import { Toaster } from "sonner";
import { QueryProvider } from "./provider/query.provider";
import { routeTree } from "./routeTree.gen";

import "./index.css";

scan({
  enabled: import.meta.env.DEV,
  showToolbar: import.meta.env.DEV,
})

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      {/* <AuthProvider> */}
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
      {/* </AuthProvider> */}
    </QueryProvider>
  </StrictMode>
);
