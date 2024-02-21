import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "Products",
  baseQuery: fetchBaseQuery({ baseUrl: "./" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "fashionProducts.json",
    }),
    getNewArrivals: builder.query({
      query: () => "NewArrivals.json",
    }),
    getTopPicks: builder.query({
      query: () => "Toppicks.json",
    }),
    getTopSales: builder.query({
      query: () => "Topsales.json",
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetTopPicksQuery,
  useGetTopSalesQuery,
  useGetNewArrivalsQuery,
} = productsApi;
