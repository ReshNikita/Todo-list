import { COMPLETE_TODO } from "../constants";

export const completeTodo = (todo) => ({
  type: COMPLETE_TODO,
  payload: todo,
});
