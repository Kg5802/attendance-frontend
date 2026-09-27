import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/authSlice";

export default function Layout({ children }) {
  const u = useSelector((s) => s.auth.user);
  const d = useDispatch();
  const n = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
              A
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-800">
              Attendance<span className="text-blue-600">Pro</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/attendance"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Attendance
            </Link>

            <Link
              to="/overtime"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Overtime
            </Link>

            {u?.role === "admin" && (
              <Link
                to="/users"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                Users
              </Link>
            )}
          </nav>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            {u && (
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {u.name || u.email}
                </p>

                <p className="text-xs capitalize text-slate-500">
                  {u.role}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                d(logout());
                n("/login");
              }}
              className="
                rounded-lg border border-slate-200
                bg-white px-3 py-2
                text-sm font-semibold text-slate-700
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
                focus:outline-none
                focus:ring-2
                focus:ring-red-100
              "
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="border-t border-slate-100 px-4 py-2 md:hidden">
          <nav className="flex gap-1 overflow-x-auto">
            <Link
              to="/"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/attendance"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            >
              Attendance
            </Link>

            <Link
              to="/overtime"
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            >
              Overtime
            </Link>

            {u?.role === "admin" && (
              <Link
                to="/users"
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                Users
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}