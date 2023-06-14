import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_HEROKU_TODOS,
    prepareHeaders: headers => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["todos"],
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => ({
        url: "/todo",
      }),
      providesTags: result => [{ type: "todos" }],
    }),
    addTodo: builder.mutation({
      query: body => ({
        url: "/todo",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
    updateTodo: builder.mutation({
      query: ({ editValue, id }) => ({
        url: `/todo/${id}`,
        method: "PATCH",
        body: { todo: editValue },
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
    removeTodo: builder.mutation({
      query: id => ({
        url: `/todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
    completedTodo: builder.mutation({
      query: id => ({
        url: `/todo/${id}/completed`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
  }),
});
