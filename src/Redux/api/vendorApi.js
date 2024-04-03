import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
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
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getVendorProducts: builder.query({
      query: () => "/vendor/products",
      providesTags: ["Product"],
    }),

    getVendorProductById: builder.query({
      query: (id) => `/vendor/products/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        Object.entries(data).map(([k, v]) => {
          if (v != "") {
            formData.append(k, v);
          }
        });
        return {
          url: `/vendor/addproduct/`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ values, id }) => {
        const formData = new FormData();
        Object.entries(values).map(([k, v]) => {
          if (v != "") {
            formData.append(k, v);
          }
        });
        return {
          url: `/vendor/products/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetVendorProductsQuery,
  useGetVendorProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = vendorApi;
