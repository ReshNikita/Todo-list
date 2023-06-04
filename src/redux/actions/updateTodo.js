import { EDIT_TODO } from "../constants";

export const updateTodo = (payload) => ({
  type: EDIT_TODO,
  payload,
});
