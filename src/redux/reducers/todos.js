import {
  ADD_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  EDIT_TODO,
  DELETE_ALL,
} from "../constants";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

export const todos = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, payload] };
    case DELETE_ALL:
      return { todos: [] };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((i) => i.id !== payload),
      };
    case EDIT_TODO:
      const updatedArray = [];
      const current = state.todos.map((i) =>
        i.id === payload.id
          ? ((i.todo = payload.todo), (i.completed = payload.completed))
          : updatedArray.push(i)
      );
      return { ...state, current };
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === payload ? { ...item, completed: !item.completed } : item
        ),
      };
    default:
      return state;
  }
};
