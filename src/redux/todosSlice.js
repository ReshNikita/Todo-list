import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      const itemId = action.payload;
      state.todos = state.todos.filter((item) => item.id !== itemId);
    },
    completeTodo(state, action) {
      const itemId = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === itemId.id ? { ...todo, completed: !todo.completed } : todo
      );
    },
    addArray(state, action) {
      [...state.todos].concat(action.payload);
    },
    editTodo(state, action) {
      const itemId = action.payload;
      state.todos.map(
        (item) => item.id === itemId.id && (item.editTodo = itemId.editTodo)
      );
    },
  },
});

export default todosSlice.reducer;
export const { addTodo, removeTodo, completeTodo, addArray, editTodo } =
  todosSlice.actions;

// editTodo: (state, action) => {
//     let { todos } = state;
//       state.todos = todos.map((item) =>
//         item.id === action.payload.id ? action.payload : item
//       );
//
//   }

// const index = state.todos.findIndex(
//     (item) => item.id === action.payload.id
//   );
//   const updatedState = [...state.todos];
//   updatedState[index].name = action.payload.name;
