import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE}`,
    //process.env.REACT_APP_TODOS,
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
      query: () => "/todos",
      transformResponse: res => res.sort((a, b) => b.id - a.id),
      providesTags: ["todos"],
    }),
    addTodo: builder.mutation({
      query: todo => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { title: todo.title },
      }),
      invalidatesTags: ["todos"],
    }),
    removeTodo: builder.mutation({
      query: id => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    completedTodo: builder.mutation({
      query: id => ({
        url: `/todos/${id}/isCompleted`,
        method: "PATCH",
      }),
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useCompletedTodoMutation,
  useRemoveTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} = todoAPI;
