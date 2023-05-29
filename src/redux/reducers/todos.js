import {
  ADD_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  UPDATE_TASK,
} from "../constants";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
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
    case UPDATE_TASK:
      return { ...state, todos: payload };
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === payload.id
            ? { ...item, completed: !item.completed }
            : item
        ),
      };

    default:
      return state;
  }
};
