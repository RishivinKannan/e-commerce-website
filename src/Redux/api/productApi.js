import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
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
  tagTypes: ["Reviews", "Question"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/review/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["Reviews"],
    }),
    postQuestion: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/question/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Questions"],
    }),
    getQuestions: builder.query({
      query: (id) => `/questions/${id}`,
      providesTags: ["Questions"],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsQuery,
  useGetQuestionsQuery,
  usePostQuestionMutation,
} = productApi;
