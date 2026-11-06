
import { useState } from "react";
import { Outlet } from "react-router";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Header } from "./Header/Header";

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-gray-950/40"
            />

            <div className="absolute inset-y-0 left-0 w-64">
              <div className="relative h-full">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute right-3 top-5 z-10 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                >
                  <X size={19} />
                </button>

                <Sidebar
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
          <Header
            onMenuClick={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
