import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
  endpoints: (build) => ({
    // login: build.mutation({
    //   // note: an optional `queryFn` may be used in place of `query`
    //   query: (payload) => ({
    //     url: `auth/login`,
    //     method: "POST",
    //     body: payload,
    //   }),
    // }),
    getTest: build.query({
      query: () => ``,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTestQuery,useLoginMutation } = authApi;
