import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/"
  }),
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => "users"
    }),
    getUserById: builder.query({
      query: id => `users/${id}`
    })
  })
});

export const { useGetUsersQuery, useGetUserByIdQuery } = api;
