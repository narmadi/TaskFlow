
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  ChartNoAxesCombined,
  Settings,
  ChevronDown,
  Plus,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", path: "/app", icon: LayoutDashboard, end: true },
      { label: "My Tasks", path: "/app/my-tasks", icon: CheckSquare },
      { label: "Projects", path: "/app/projects", icon: FolderKanban },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Team Members", path: "/app/team", icon: Users },
      { label: "Reports", path: "/app/reports", icon: ChartNoAxesCombined },
    ],
  },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-100 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-white">
          <Zap size={21} fill="currentColor" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          TaskFlow
        </span>
      </div>

      {/* Workspace selector */}
      <div className="px-4 pb-5">
        <button className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition hover:bg-gray-50">
          <div className="flex size-9 items-center justify-center rounded-lg bg-purple-100 font-semibold text-primary">
            T
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">
              Team Workspace
            </p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>

          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-4 pb-5">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={"end" in item ? item.end : false}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                        isActive
                          ? "bg-purple-50 text-primary"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )
                    }
                  >
                    <Icon size={19} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-100 p-4">
        <NavLink
          to="/app/settings"
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              isActive
                ? "bg-purple-50 text-primary"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )
          }
        >
          <Settings size={19} />
          Settings
        </NavLink>

        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <Plus size={17} />
          Invite members
        </button>
      </div>
    </aside>
  );
}
