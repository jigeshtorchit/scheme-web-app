

import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const FilterApi = createApi({
  reducerPath: "FilterApi",
  baseQuery: CustomFetchBase,
  endpoints: (builder) => ({
    getFilter: builder.mutation({
      query: (data) => ({
        url: "/filterFacilities",
        method: "GET",
        body: data,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {}
      },
    }),
   
  }),
});

export const {
  useGetFilterMutation
} = FilterApi;