import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import Router from "./Router.tsx";
import {ThemeProvider} from "styled-components";
import {theme} from "./theme.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
