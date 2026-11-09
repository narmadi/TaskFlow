
import { createBrowserRouter, Navigate } from "react-router";

import { AppLayout } from "@/components/layout/AppLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import WorkspacesPage from "@/features/workspaces/components/WorkspacesPage";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-500">
        This section is coming soon. We're building it for TaskFlow.
      </p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "my-tasks",
            element: <PlaceholderPage title="My Tasks" />,
          },
          {
            path: "projects",
            element: <PlaceholderPage title="Projects" />,
          },
          {
            path: "projects/:projectId",
            element: <PlaceholderPage title="Project Details" />,
          },
          {
            path: "projects/:projectId/board",
            element: <PlaceholderPage title="Project Board" />,
          },
          {
            path: "team",
            element: <PlaceholderPage title="Team Members" />,
          },
          {
            path: "reports",
            element: <PlaceholderPage title="Reports & Analytics" />,
          },
          {
            path: "notifications",
            element: <PlaceholderPage title="Notifications" />,
          },
          {
            path: "settings",
            element: <PlaceholderPage title="Settings" />,
          },
          {
            path: "workspaces",
            element: <WorkspacesPage />,
          },
          {
            path: "*",
            element: <PlaceholderPage title="Page Not Found" />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
