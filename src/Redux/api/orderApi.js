import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/checkout`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    paymentUpdate: builder.mutation({
      query: (data) => {
        return {
          url: `/paymentupdate`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Order"],
    }),
    getOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  usePostOrderMutation,
  usePaymentUpdateMutation,
} = orderApi;
