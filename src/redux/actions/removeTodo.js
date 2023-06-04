import { REMOVE_TODO } from "../constants";

export const removeTodo = (payload) => ({
  type: REMOVE_TODO,
  payload,
});
