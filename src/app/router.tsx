import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// Keep your existing authentication routes.

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <AppLayout />,
    children: [
      {
        path: "*",
        element: <DashboardPage />,
      },
    ],
  },
]);