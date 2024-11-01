import { useMemo } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/app/root";
import { Dashboard } from "./routes/app/dashboard";
import { Register } from "./routes/auth/register";
import { Login } from "./routes/auth/login";

const paths = {
  home: {
    path: "/",
    getUrl: () => "/",
  },

  auth: {
    register: {
      path: "/auth/register",
      getUrl: () => "/auth/register",
    },
    login: {
      path: "/auth/login",
      getUrl: () => "/auth/login",
    },
  },

  app: {
    root: {
      path: "/",
      getUrl: () => "/",
    },
    dashboard: {
      path: "/dashboard",
      getUrl: () => "/dashboard",
    },
  },
};

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.app.root.path,
      element: <AppRoot />,
      children: [
        {
          path: paths.app.dashboard.path,
          Component: Dashboard,
        },
      ],
    },
    {
      path: paths.auth.register.path,
      element: <Register />,
    },
    {
      path: paths.auth.login.path,
      element: <Login />,
    },
  ]);

export const AppRouter = () => {
  const queryClient = new QueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
