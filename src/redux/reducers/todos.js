import { ADD_ARRAY, ADD_TODO, REMOVE_TODO, COMPLETE_TODO } from "../constants";

const initialState = {
  todos: [],
};

export const todos = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, payload] };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((i) => i.id !== payload),
      };
    case ADD_ARRAY:
      return { ...state, todos: [...state.todos].concat(payload) };
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((i) =>
          i.id === payload.id ? { ...i, completed: !i.completed } : i
        ),
      };
    default:
      return state;
  }
};
