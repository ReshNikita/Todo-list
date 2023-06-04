import { COMPLETE_TODO } from "../constants";

export const completeTodo = (payload) => ({
  type: COMPLETE_TODO,
  payload,
});
