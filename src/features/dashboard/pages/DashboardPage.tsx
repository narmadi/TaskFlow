
import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { Badge, Avatar } from "@/components/ui";

const statistics = [
  {
    title: "Total Projects",
    value: "12",
    change: "+2 this month",
    icon: FolderKanban,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Completed Tasks",
    value: "48",
    change: "+12 this week",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "In Progress",
    value: "18",
    change: "Across 5 projects",
    icon: Clock3,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Overdue Tasks",
    value: "4",
    change: "Needs attention",
    icon: AlertCircle,
    color: "bg-red-50 text-red-600",
  },
];

const projects = [
  {
    name: "Website Redesign",
    description: "Redesign the company website",
    progress: 75,
    status: "In Progress",
    color: "bg-purple-500",
    members: ["Alex Morgan", "Sarah Lee", "John Smith"],
  },
  {
    name: "Mobile App Development",
    description: "Build the new mobile application",
    progress: 45,
    status: "In Progress",
    color: "bg-blue-500",
    members: ["Sarah Lee", "David Kim"],
  },
  {
    name: "Marketing Campaign",
    description: "Q4 marketing campaign",
    progress: 100,
    status: "Completed",
    color: "bg-green-500",
    members: ["Alex Morgan", "David Kim"],
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-primary">
            Friday, November 7, 2026
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back, Alex! 
          </h1>
          <p className="mt-1 text-sm text-muted">
            Here's what's happening with your projects today.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`flex size-11 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={21} />
                </div>

                <ArrowUpRight size={18} className="text-gray-300" />
              </div>

              <p className="mt-4 text-sm text-muted">
                {stat.title}
              </p>

              <p className="mt-1 text-2xl font-bold text-foreground">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Projects */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Recent Projects
            </h2>
            <p className="mt-1 text-sm text-muted">
              Track progress across your workspace.
            </p>
          </div>

          <button className="text-sm font-medium text-primary hover:underline">
            View all
          </button>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.name}>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    {project.description}
                  </p>
                </div>

                <Badge
                  variant={
                    project.status === "Completed"
                      ? "success"
                      : "info"
                  }
                >
                  {project.status}
                </Badge>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <span className="w-10 text-right text-xs font-semibold text-gray-600">
                  {project.progress}%
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {project.members.map((member) => (
                    <div
                      key={member}
                      className="rounded-full border-2 border-white"
                    >
                      <Avatar name={member} size="sm" />
                    </div>
                  ))}
                </div>

                <span className="text-xs text-gray-400">
                  {project.members.length} members
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
