import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";
export const FilterApi = createApi({
  reducerPath: "FilterApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["FILTER"],
  endpoints: (build) => ({
    getFilter: build.query({
      query: (data) => ({
        url: `/filterFacilities`,
        method: "GET",
        body:data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["FILTER"],
    }),
  }),
});
export const { useGetFilterQuery } = FilterApi;