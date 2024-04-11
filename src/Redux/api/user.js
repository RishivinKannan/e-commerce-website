import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/user/update",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateProfileMutation } = userApi;
