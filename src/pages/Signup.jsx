import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../services/api";
import { setAuth } from "../app/authSlice";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [signup, { isLoading, error }] = useSignupMutation();

  const d = useDispatch();
  const n = useNavigate();

  const set = (k, v) =>
    setForm((x) => ({
      ...x,
      [k]: v,
    }));

  const submit = async (e) => {
    e.preventDefault();

    try {
      const r = await signup(form).unwrap();

      d(setAuth(r));
      n("/");
    } catch {}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
            A
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Attendance<span className="text-blue-600">Pro</span>
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create your account to get started
          </p>
        </div>

        {/* Signup Card */}
        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Create account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter your details to create your account
            </p>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>

            <input
              id="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
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
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              placeholder="Minimum 6 characters"
              type="password"
              minLength="6"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
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

          {/* Role */}
          <div className="mb-5">
            <label
              htmlFor="role"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Account role
            </label>

            <select
              id="role"
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              className="
                w-full appearance-none rounded-lg
                border border-slate-300 bg-white
                px-4 py-3 text-sm text-slate-800
                outline-none transition
                hover:border-slate-400
                focus:border-blue-500
                focus:ring-4 focus:ring-blue-100
              "
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">
                {error.data?.message || "Signup failed"}
              </p>
            </div>
          )}

          {/* Signup Button */}
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
            {isLoading ? "Creating account..." : "Sign up"}
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Back to login
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