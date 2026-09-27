import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/api";
import { setAuth } from "../app/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const d = useDispatch();
  const n = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const r = await login({ email, password }).unwrap();

      d(setAuth(r));
      n("/");
    } catch {}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
            A
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Attendance<span className="text-blue-600">Pro</span>
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Attendance management made simple
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="
                w-full rounded-lg border border-slate-300
                bg-white px-4 py-3 text-sm text-slate-800
                outline-none transition
                placeholder:text-slate-400
                hover:border-slate-400
                focus:border-blue-500
                focus:ring-4 focus:ring-blue-100
              "
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="
                w-full rounded-lg border border-slate-300
                bg-white px-4 py-3 text-sm text-slate-800
                outline-none transition
                placeholder:text-slate-400
                hover:border-slate-400
                focus:border-blue-500
                focus:ring-4 focus:ring-blue-100
              "
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">
                {error.data?.message || "Login failed"}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full rounded-lg bg-blue-600
              px-4 py-3 text-sm font-semibold text-white
              shadow-sm transition
              hover:bg-blue-700
              focus:outline-none focus:ring-4 focus:ring-blue-100
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 AttendancePro. All rights reserved.
        </p>
      </div>
    </div>
  );
}