import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const SchemeApi = createApi({
  reducerPath: "SchemeApi",
  baseQuery: customFetchBase,
  tagTypes: ["SCHEME"],
  endpoints: (builder) => ({
    getScheme: builder.query({
      query: (page) => ({
        url: `/scheme/schemeView?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["SCHEME"],
    }),

    getSchemeById: builder.query({
      query: (_id) => ({
        url: `/scheme/${_id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTag: ["SCHEME"],
    }),
    addScheme: builder.mutation({
      query: (data) => ({
        url: "scheme/schemeAdd",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["SCHEME"],
    }),
    deleteScheme: builder.mutation({
      query: (id) => ({
        url: `scheme/schemeDelete/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["SCHEME"],
    }),
    editScheme: builder.mutation({
      query: ({ id, data }) => ({
        url: `/scheme/schemeEdit/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["SCHEME"],
    }),
  }),
});

export const {
  useAddSchemeMutation,
  useDeleteSchemeMutation,
  useEditSchemeMutation,
  useGetSchemeByIdQuery,
  useGetSchemeQuery,
} = SchemeApi;
