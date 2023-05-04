import { ADD_TODO } from "../constants";

const initialState = [];

export const todos = (
  state = initialState,
  { id, todo, isCompleted, type }
) => {
  switch (type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id,
          todo,
          isCompleted,
        },
      ];

    default:
      return state;
  }
};
