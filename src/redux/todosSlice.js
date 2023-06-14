import { createSlice } from "@reduxjs/toolkit";
import { getTodos, addAsyncTodo } from "./Async";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  isLoading: false,
  error: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    deleteAll() {
      return { todos: [] };
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(item => item.id !== action.payload);
    },
    completeTodo(state, action) {
      const current = [...state.todos].find(item => item.id === action.payload);
      current.completed = !current.completed;
    },
    updateTodo(state, action) {
      state.todos.map(i =>
        i.id === action.payload.id
          ? ((i.todo = action.payload.todo),
            (i.completed = action.payload.completed))
          : i
      );
    },
  },
  extraReducers: {
    [getTodos.pending.type]: state => {
      state.isLoading = true;
    },
    [getTodos.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
      state.error = "";
    },
    [getTodos.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addAsyncTodo.pending.type]: state => {
      state.isLoading = true;
    },
    [addAsyncTodo.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tasks.push({ ...action.payload });
      state.error = "";
    },
    [addAsyncTodo.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, removeTodo, completeTodo, updateTodo, deleteAll } =
  todosSlice.actions;
