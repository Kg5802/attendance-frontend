import { useSelector } from "react-redux";
import {
  useAttendanceQuery,
  useOvertimeQuery,
} from "../services/api";

export default function Dashboard() {
  const u = useSelector((s) => s.auth.user);

  const { data: att = [] } = useAttendanceQuery();
  const { data: ot = [] } = useOvertimeQuery();

  const completed = att.filter(
    (a) => a.workStatus === "Completed"
  ).length;

  const pending = ot.filter(
    (x) => x.status === "Pending"
  ).length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome,{" "}
          <span className="font-medium text-slate-700">
            {u?.name}
          </span>{" "}
          ·{" "}
          <span className="capitalize font-medium text-blue-600">
            {u?.role}
          </span>
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Attendance */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Attendance Records
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-800">
                {att.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Total attendance records
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Completed Shifts
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-800">
                {completed}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Successfully completed
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Pending Overtime */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Pending Overtime
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-800">
                {pending}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Awaiting review
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow */}
      <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Workflow
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            How AttendancePro manages attendance and overtime.
          </p>
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Step 1 */}
            <div className="flex flex-1 items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                1
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Punch In
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Employees capture a live selfie and GPS location
                  at punch-in.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden text-slate-300 md:block">
              →
            </div>

            {/* Step 2 */}
            <div className="flex flex-1 items-start gap-3 rounded-lg border border-indigo-100 bg-indigo-50/60 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                2
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Validation
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Managers and Admins validate attendance records.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden text-slate-300 md:block">
              →
            </div>

            {/* Step 3 */}
            <div className="flex flex-1 items-start gap-3 rounded-lg border border-green-100 bg-green-50/60 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                3
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Overtime Review
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Managers and Admins review overtime requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}