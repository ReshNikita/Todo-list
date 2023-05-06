import { ADD_TODO } from "../constants";
import { REMOVE_TODO } from "../constants";

const initialState = {
  todos: [],
};

export const todos = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, payload] };
    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter((i) => i.id !== payload) };
    default:
      return state;
  }
};
