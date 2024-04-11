import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorQuestionsApi = createApi({
  reducerPath: "vendorQuestionsApi",
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
  tagTypes: ["Questions"],
  endpoints: (builder) => ({
    getVendorQuestions: builder.query({
      query: () => "/vendor/questions",
      providesTags: ["Questions"],
    }),
    getVendorUnanswered: builder.query({
      query: () => "/vendor/questions/unanswered",
      providesTags: ["Questions"],
    }),
    postAnswer: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/vendor/answer/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const { useGetVendorQuestionsQuery, useGetVendorUnansweredQuery,usePostAnswerMutation } =
  vendorQuestionsApi;
