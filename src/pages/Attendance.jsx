import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAttendanceQuery,
  usePunchInMutation,
  usePunchOutMutation,
  useValidateMutation,
} from "../services/api";
import CameraCapture from "../components/CameraCapture";

export default function Attendance() {
  const u = useSelector((s) => s.auth.user);

  const { data = [], isLoading } = useAttendanceQuery();

  const [punchIn, { isLoading: inBusy }] = usePunchInMutation();
  const [punchOut, { isLoading: outBusy }] = usePunchOutMutation();
  const [validate] = useValidateMutation();

  const [selfie, setSelfie] = useState(null);
  const [loc, setLoc] = useState(null);
  const [msg, setMsg] = useState("");

  const active =
    data.some(
      (a) => a.employee?._id === u?.id && !a.punchOut
    ) ||
    data.some(
      (a) => a.employee === u?.id && !a.punchOut
    );

  const getLocation = () =>
    navigator.geolocation.getCurrentPosition(
      (p) =>
        setLoc({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
        }),
      () => setMsg("Location permission is required.")
    );

  const doIn = async () => {
    if (!selfie) return setMsg("Capture selfie first");
    if (!loc) return setMsg("Capture location first");

    try {
      await punchIn({
        selfie,
        latitude: loc.latitude,
        longitude: loc.longitude,
      }).unwrap();

      setMsg("Punch-in successful");
    } catch (e) {
      setMsg(e.data?.message || "Punch-in failed");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Attendance
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track attendance, location, and working hours.
          </p>
        </div>

        {/* Employee Actions */}
        {u?.role === "employee" && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={getLocation}
              className="
                inline-flex items-center gap-2 rounded-lg
                border border-slate-300 bg-white
                px-4 py-2.5 text-sm font-semibold text-slate-700
                shadow-sm transition
                hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600
                focus:outline-none focus:ring-4 focus:ring-blue-100
              "
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-12v3l2 2"
                />
              </svg>
              Get Location
            </button>

            <button
              onClick={doIn}
              disabled={inBusy || active}
              className="
                inline-flex items-center gap-2 rounded-lg
                bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
                shadow-sm transition
                hover:bg-blue-700
                focus:outline-none focus:ring-4 focus:ring-blue-100
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {inBusy ? "Punching In..." : "Punch In"}
            </button>

            <button
              onClick={() => punchOut()}
              disabled={outBusy || !active}
              className="
                inline-flex items-center gap-2 rounded-lg
                bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white
                shadow-sm transition
                hover:bg-slate-900
                focus:outline-none focus:ring-4 focus:ring-slate-200
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {outBusy ? "Punching Out..." : "Punch Out"}
            </button>
          </div>
        )}
      </div>

      {/* Employee Punch Card */}
      {u?.role === "employee" && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-800">
              Daily Attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Capture your selfie and GPS location before punching in.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Camera */}
            <div>
              <CameraCapture onCapture={setSelfie} />
            </div>

            {/* Location Information */}
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 21a2 2 0 01-2.828 0l-4.243-4.343a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      GPS Location
                    </h3>

                    <p className="text-xs text-slate-500">
                      Required for punch-in
                    </p>
                  </div>
                </div>

                {loc ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />

                      <span className="text-sm font-semibold text-green-700">
                        Location captured
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-green-700">
                      GPS: {loc.latitude.toFixed(5)},{" "}
                      {loc.longitude.toFixed(5)}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                    <p className="text-sm font-medium text-slate-600">
                      Location not captured
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Click "Get Location" to capture your current GPS
                      coordinates.
                    </p>
                  </div>
                )}
              </div>

              {/* Message */}
              {msg && (
                <div
                  className={`mt-4 rounded-lg border px-4 py-3 ${
                    msg.includes("successful")
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  <p className="text-sm font-medium">{msg}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-800">
              Attendance Records
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Attendance history and validation details
            </p>
          </div>

          {!isLoading && (
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {data.length}{" "}
              {data.length === 1 ? "Record" : "Records"}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  In
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Out
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Hours
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Work
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Validation
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Selfie
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                      <p className="mt-3 text-sm text-slate-500">
                        Loading attendance...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-5 py-12 text-center">
                    <p className="text-sm font-medium text-slate-600">
                      No attendance records found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Attendance records will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                data.map((a) => (
                  <tr
                    key={a._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Employee */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                          {(a.employee?.name || u?.name)
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <span className="text-sm font-medium text-slate-800">
                          {a.employee?.name || u?.name}
                        </span>
                      </div>
                    </td>

                    {/* Punch In */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {new Date(a.punchIn).toLocaleString()}
                    </td>

                    {/* Punch Out */}
                    <td className="whitespace-nowrap px-5 py-4">
                      {a.punchOut ? (
                        <span className="text-sm text-slate-600">
                          {new Date(a.punchOut).toLocaleString()}
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Hours */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {a.totalWorkingHours}
                      </span>
                    </td>

                    {/* Work Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          a.workStatus === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {a.workStatus}
                      </span>
                    </td>

                    {/* Validation */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          a.validationStatus === "Valid"
                            ? "bg-green-100 text-green-700"
                            : a.validationStatus === "Invalid"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.validationStatus}
                      </span>
                    </td>

                    {/* Selfie */}
                    <td className="px-5 py-4">
                      {a.selfie ? (
                        <img
                          className="h-12 w-12 rounded-lg border border-slate-200 object-cover shadow-sm"
                          src={a.selfie}
                          alt="selfie"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">
                          No selfie
                        </span>
                      )}
                    </td>

                    {/* Location */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {a.location?.latitude?.toFixed(4)},{" "}
                      {a.location?.longitude?.toFixed(4)}
                    </td>

                    {/* Action */}
                    <td className="whitespace-nowrap px-5 py-4">
                      {["manager", "admin"].includes(u?.role) ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              validate({
                                id: a._id,
                                validationStatus: "Valid",
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
                            Valid
                          </button>

                          <button
                            onClick={() =>
                              validate({
                                id: a._id,
                                validationStatus: "Invalid",
                                remarks: "Suspicious",
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
                            Invalid
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