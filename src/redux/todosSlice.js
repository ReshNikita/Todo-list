import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
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
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    completeTodo(state, action) {
      const current = [...state.todos].find(
        (item) => item.id === action.payload
      );
      current.completed = !current.completed;
    },
    updateTodo(state, action) {
      state.todos.map((i) =>
        i.id === action.payload.id
          ? ((i.todo = action.payload.todo),
            (i.completed = action.payload.completed))
          : i
      );
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, removeTodo, completeTodo, updateTodo, deleteAll } =
  todosSlice.actions;
