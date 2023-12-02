import { createApi,} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./CustomFetchBase";

export const SchemeApi = createApi({
  reducerPath: "SchemeApi",
  baseQuery: customFetchBase,
  tagTypes:["SCHEME"], 
  endpoints: (builder) => ({
    getScheme: builder.query({
        query: (page) => ({
          url: `/scheme/schemeView?page=${page}`, 
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8", 
          },
        }),
        providesTags:["SCHEME"],
      }),
    // searchTrainingData: builder.query({
    //   query: (search) => ({
    //     url: `/training/${search}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   providesTags:["TRAINING"],
    // }),
    // getTrainingById: builder.query({
    //   query: (_id) => ({
    //     url: `/training/${_id}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   providesTag:["TRAINING"],
    // }),
    addScheme: builder.mutation({
      query: (data) => ({
        url: "scheme/schemeAdd",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:["SCHEME"],
    }),
    deleteScheme: builder.mutation({
      query: (id) => ({
        url: `scheme/schemeDelete/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:["SCHEME"],
    }),
    editTraining: builder.mutation({
      query: ({id, data }) => ({
        url: `/scheme/schemeEdit/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags:["SCHEME"],
    }),
  }), 
});

export const {
  useAddSchemeMutation,
  useDeleteSchemeMutation,
  useEditTrainingMutation,
  useGetTrainingByIdQuery,
  useGetSchemeQuery,
  useSearchTrainingDataQuery,
} = SchemeApi;
