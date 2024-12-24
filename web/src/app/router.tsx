import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/app/root";
import { paths } from "@/config/paths";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        path: paths.auth.register.path,
        lazy: async () => {
          const { Register } = await import("./routes/auth/register");

          return { Component: Register };
        },
      },
      {
        path: paths.auth.login.path,
        lazy: async () => {
          const { Login } = await import("./routes/auth/login");

          return { Component: Login };
        },
      },
    ],
  },
  {
    path: paths.app.root.path,
    element: <AppRoot />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: paths.app.dashboard.path,
        lazy: async () => {
          const { Dashboard } = await import("./routes/app/dashboard");

          return { Component: Dashboard };
        },
      },
      {
        path: paths.app.account.path,
        lazy: async () => {
          const { Accounts } = await import("./routes/app/accounts");

          return { Component: Accounts };
        },
      },
      {
        path: paths.app.category.path,
        lazy: async () => {
          const { Categories } = await import("./routes/app/categories");

          return { Component: Categories };
        },
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
