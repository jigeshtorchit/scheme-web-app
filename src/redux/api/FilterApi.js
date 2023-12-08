import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const FilterApi = createApi({
  reducerPath: "FilterApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["FILTER"],
  endpoints: (builder) => ({
    getFilter: builder.query({
      query: (page) => ({
        url: `/scheme/schemeView?page=${page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["FILTER"],
    }),
    dataFilter: builder.mutation({
      query: ({ data, page }) => ({
        url: `/filterFacilities?page=${page}`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["FILTER"],
    }),
    getStates: builder.query({
      query: () => ({
        url: `/api/categories/state`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["FILTER"],
    }),
    getGender: builder.query({
      query: () => ({
        url: `/api/categories/gender`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["FILTER"],
    }),
    getAge: builder.query({
      query: () => ({
        url: `/api/categories/age`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["FILTER"],
    }),
    getDisablities: builder.query({
      query: () => ({
        url: `/api/categories/disability`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["FILTER"],
    }),
    getIncome: builder.query({
      query: () => ({
        url: `/api/categories/income`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["FILTER"],
    }),
  }),
});

export const {
  useGetFilterQuery,
  useDataFilterMutation,
  useGetAgeQuery,
  useGetDisablitiesQuery,
  useGetStatesQuery,
  useGetIncomeQuery,
  useGetGenderQuery,
} = FilterApi;
