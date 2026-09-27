import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../app/authSlice";

const base = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_API_URL || "https://attendance-backend-etv2.vercel.app/api",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",

  baseQuery: async (args, api, extra) => {
    const result = await base(args, api, extra);

    if (result.error?.status === 401) {
      api.dispatch(logout());
    }

    return result;
  },

  tagTypes: ["Attendance", "Overtime", "Users"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),

    attendance: builder.query({
      query: () => "/attendance",
      providesTags: ["Attendance"],
    }),

    punchIn: builder.mutation({
      query: (body) => ({
        url: "/attendance/punch-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    punchOut: builder.mutation({
      query: () => ({
        url: "/attendance/punch-out",
        method: "POST",
      }),
      invalidatesTags: ["Attendance"],
    }),

    validate: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/attendance/${id}/validate`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    overtime: builder.query({
      query: () => "/overtime",
      providesTags: ["Overtime"],
    }),

    createOvertime: builder.mutation({
      query: (body) => ({
        url: "/overtime",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Overtime", "Attendance"],
    }),

    reviewOvertime: builder.mutation({
      query: ({ id, status }) => ({
        url: `/overtime/${id}/review`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Overtime", "Attendance"],
    }),

    users: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useAttendanceQuery,
  usePunchInMutation,
  usePunchOutMutation,
  useValidateMutation,
  useOvertimeQuery,
  useCreateOvertimeMutation,
  useReviewOvertimeMutation,
  useUsersQuery,
} = api;