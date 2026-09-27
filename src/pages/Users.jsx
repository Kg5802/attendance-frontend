import { useUsersQuery } from "../services/api";

export default function Users() {
  const { data = [], isLoading } = useUsersQuery();

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage employees, managers, and account status.
          </p>
        </div>

        {/* User Count */}
        {!isLoading && (
          <div className="w-fit rounded-lg bg-blue-50 px-4 py-2">
            <span className="text-sm font-semibold text-blue-600">
              {data.length} {data.length === 1 ? "User" : "Users"}
            </span>
          </div>
        )}
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Mobile Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            {/* Table Header */}
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Name
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Role
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Manager
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                      <p className="mt-3 text-sm text-slate-500">
                        Loading users...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center">
                    <p className="text-sm font-medium text-slate-600">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      There are currently no users to display.
                    </p>
                  </td>
                </tr>
              ) : (
                data.map((u) => (
                  <tr
                    key={u._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Name */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                          {u.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <span className="font-medium text-slate-800">
                          {u.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {u.email}
                    </td>

                    {/* Role */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                          u.role === "manager"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    {/* Manager */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {u.managerId?.name || "-"}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          u.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            u.active ? "bg-green-500" : "bg-red-500"
                          }`}
                        />

                        {u.active ? "Active" : "Inactive"}
                      </span>
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