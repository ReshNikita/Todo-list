import { REMOVE_TODO } from "../constants";

export const removeTask = (todo) => ({
  type: REMOVE_TODO,
  payload: todo.id,
});
