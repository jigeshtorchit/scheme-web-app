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
      query: ({data,page}) => ({
        url: `/filterFacilities?page=${page}`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["FILTER"],
    }),
  }),
});

export const { useGetFilterQuery ,useDataFilterMutation} = FilterApi;
