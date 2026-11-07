import { useNavigate } from "react-router";
import { useAuth } from "@/features/auth/hooks/AuthContext";
import {
  Search,
  Bell,
  Menu,
  Plus,
  LogOut,
} from "lucide-react";
import { Avatar } from "@/components/ui";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const fullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8">

      {/* Left section */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search TaskFlow"
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
            ⌘ K
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 sm:flex"
        >
          <Plus size={17} />
          New Project
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3 sm:pl-4">
          <Avatar
            name={fullName}
            size="md"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {fullName}
            </p>
            <p className="text-xs text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="flex items-center gap-2 rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} />
          <span className="hidden text-sm font-medium md:inline">
            Logout
          </span>
        </button>

      </div>
    </header>
  );
}