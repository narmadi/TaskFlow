
import { Link } from "react-router";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F4F5F9] lg:grid lg:grid-cols-2">
      {/* Branding panel */}
      <section className="hidden bg-[#635BEB] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/login" className="text-2xl font-bold tracking-tight">
          TaskFlow<span className="text-purple-200">.</span>
        </Link>

        <div className="mx-auto max-w-lg">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15">
            <span className="text-5xl">✦</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Bring your team's best work together.
          </h1>

          <p className="mt-5 text-lg leading-8 text-purple-100">
            Plan projects, organize tasks, and collaborate with your team
            in one simple workspace.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-2xl font-bold">100%</p>
              <p className="mt-1 text-sm text-purple-100">
                Team visibility
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-2xl font-bold">One</p>
              <p className="mt-1 text-sm text-purple-100">
                Shared workspace
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-purple-200">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </p>
      </section>

      {/* Form panel */}
      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            to="/login"
            className="mb-10 inline-block text-2xl font-bold text-[#635BEB] lg:hidden"
          >
            TaskFlow.
          </Link>

          <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-10">
            <h2 className="text-2xl font-bold text-[#22243A]">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#73758A]">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>

            <div className="mt-7 border-t border-gray-100 pt-6 text-center text-sm text-[#73758A]">
              {footer}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
