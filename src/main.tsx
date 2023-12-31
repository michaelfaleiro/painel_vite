import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import "./index.css";

import Home from "./pages/Home/Index.tsx";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage/Index.tsx";
import { queryClient } from "./services/queryClient.ts";
import RemessaDetails from "./pages/Remessa/Index.tsx";
import Login from "./pages/Login/Index.tsx";
import { AuthProvider } from "./context/AuthProvider/auth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/remessa/:id",
        element: <RemessaDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
