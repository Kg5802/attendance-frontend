import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAttendanceQuery,
  useOvertimeQuery,
  useCreateOvertimeMutation,
  useReviewOvertimeMutation,
} from "../services/api";

export default function Overtime() {
  const u = useSelector((s) => s.auth.user);

  const { data: att = [] } = useAttendanceQuery();
  const { data = [], isLoading } = useOvertimeQuery();

  const [create] = useCreateOvertimeMutation();
  const [review] = useReviewOvertimeMutation();

  const [attendance, setAttendance] = useState("");
  const [hours, setHours] = useState(1);
  const [reason, setReason] = useState("");

  const completed = att.filter((a) => a.punchOut);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Overtime
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage overtime requests and approvals.
        </p>
      </div>

      {/* Employee Request Form */}
      {u?.role === "employee" && (
        <form
          className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          onSubmit={async (e) => {
            e.preventDefault();

            await create({
              attendance,
              hours: Number(hours),
              reason,
            });

            setReason("");
          }}
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-800">
              Request Overtime
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Submit an overtime request for completed attendance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Attendance */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Attendance
              </label>

              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                required
                className="
                  w-full rounded-lg border border-slate-300
                  bg-white px-4 py-2.5 text-sm text-slate-800
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-100
                "
              >
                <option value="">Select attendance</option>

                {completed.map((a) => (
                  <option key={a._id} value={a._id}>
                    {new Date(a.punchIn).toLocaleDateString()} ·{" "}
                    {a.totalWorkingHours}h
                  </option>
                ))}
              </select>
            </div>

            {/* Hours */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Overtime Hours
              </label>

              <input
                type="number"
                min="0.5"
                max="12"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="
                  w-full rounded-lg border border-slate-300
                  bg-white px-4 py-2.5 text-sm text-slate-800
                  outline-none transition
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-100
                "
              />
            </div>

            {/* Reason */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Reason
              </label>

              <input
                placeholder="Enter reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="
                  w-full rounded-lg border border-slate-300
                  bg-white px-4 py-2.5 text-sm text-slate-800
                  outline-none transition
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-4 focus:ring-blue-100
                "
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              className="
                rounded-lg bg-blue-600
                px-5 py-2.5 text-sm font-semibold text-white
                shadow-sm transition
                hover:bg-blue-700
                focus:outline-none focus:ring-4 focus:ring-blue-100
                active:scale-[0.98]
              "
            >
              Request OT
            </button>
          </div>
        </form>
      )}

      {/* Overtime Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-800">
              Overtime Requests
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Review and manage overtime requests
            </p>
          </div>

          {!isLoading && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {data.length} {data.length === 1 ? "Request" : "Requests"}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Hours
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Reason
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                      <p className="mt-3 text-sm text-slate-500">
                        Loading overtime requests...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center">
                    <p className="text-sm font-medium text-slate-600">
                      No overtime requests found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Overtime requests will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                data.map((o) => (
                  <tr
                    key={o._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Employee */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                          {o.employee?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <span className="text-sm font-medium text-slate-800">
                          {o.employee?.name || "-"}
                        </span>
                      </div>
                    </td>

                    {/* Hours */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                        {o.hours}h
                      </span>
                    </td>

                    {/* Reason */}
                    <td className="max-w-xs px-5 py-4 text-sm text-slate-600">
                      <span className="line-clamp-2">
                        {o.reason}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          o.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : o.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap px-5 py-4">
                      {["manager", "admin"].includes(u?.role) &&
                      o.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              review({
                                id: o._id,
                                status: "Approved",
                              })
                            }
                            className="
                              rounded-lg bg-green-600
                              px-3 py-1.5 text-xs font-semibold text-white
                              transition hover:bg-green-700
                              focus:outline-none focus:ring-2
                              focus:ring-green-200
                            "
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              review({
                                id: o._id,
                                status: "Rejected",
                              })
                            }
                            className="
                              rounded-lg bg-red-600
                              px-3 py-1.5 text-xs font-semibold text-white
                              transition hover:bg-red-700
                              focus:outline-none focus:ring-2
                              focus:ring-red-200
                            "
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}