import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
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
  tagTypes: ["Cart", "Address"],
  endpoints: (builder) => ({
    postCartItem: builder.mutation({
      query: (data) => {
        return {
          url: `/addcart`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    incrementQty: builder.mutation({
      query: (id) => {
        return {
          url: `/incrementqty/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Cart"],
    }),
    decrementQty: builder.mutation({
      query: (id) => {
        return {
          url: `/decrementqty/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Cart"],
    }),
    deleteItem: builder.mutation({
      query: (id) => {
        return {
          url: `/deleteitem/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: () => `/cart`,
      providesTags: ["Cart"],
    }),
    getCartItem: builder.query({
      query: (id) => `/cart/${id}`,
      providesTags: ["Cart"],
    }),
    getOrderSummary: builder.query({
      query: () => `/ordersummary`,
      providesTags: ["Cart"],
    }),
    applyCoupon: builder.mutation({
      query: (coupon) => `/coupon/${coupon}`,
    }),
    getCoupon: builder.query({
      query: () => `/coupons`,
    }),
    getAddress: builder.query({
      query: () => `/address`,
      providesTags: ["Address"],
    }),
    postAddress: builder.mutation({
      query: (data) => {
        return {
          url: `/address`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/address/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetCartQuery,
  usePostCartItemMutation,
  useGetCartItemQuery,
  useDecrementQtyMutation,
  useIncrementQtyMutation,
  useDeleteItemMutation,
  useGetOrderSummaryQuery,
  useApplyCouponMutation,
  useGetCouponQuery,
  useGetAddressQuery,
  usePostAddressMutation,
  useUpdateAddressMutation,
} = cartApi;
