import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trackerApi = createApi({
  reducerPath: "trackerApi",
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
  tagTypes: ["tracker"],
  endpoints: (builder) => ({
    postTracker: builder.mutation({
      query: (data) => {
        return {
          url: `/trackers/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["tracker"],
    }),
    deleteTracker: builder.mutation({
      query: (id) => {
        return {
          url: `/trackers/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["tracker"],
    }),
    getTrackers: builder.query({
      query: () => `/trackers`,
      providesTags: ["tracker"],
    }),
    getTracker: builder.query({
      query: (id) => `/tracker/${id}`,
      providesTags: ["tracker"],
    }),
    getPrices: builder.query({
      query: (id) => `/prices/${id}`,
      providesTags: ["tracker"],
    }),
  }),
});

export const {
  useGetPricesQuery,
  useGetTrackersQuery,
  useGetTrackerQuery,
  usePostTrackerMutation,
  useDeleteTrackerMutation,
} = trackerApi;
