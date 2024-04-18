import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorOrderApi = createApi({
  reducerPath: "vendorOrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().vendor.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getVendorOrders: builder.query({
      query: () => "/vendor/orders",
      providesTags: ["Order"],
    }),
    postDispatchOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/vendor/order/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetVendorOrdersQuery,usePostDispatchOrderMutation } =
  vendorOrderApi;
