import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsDjangoApi = createApi({
  reducerPath: "ProductsDjango",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getNewArrival: builder.query({
      query: () => "newarrivals",
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getSearchProducts: builder.query({
      query: (query) => `search/${query}`,
    }),
    getCategoryProducts: builder.query({
      query: (query) => `category/${query}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetSearchProductsQuery,
  useGetCategoryProductsQuery,
  useGetNewArrivalQuery,
} = productsDjangoApi;
