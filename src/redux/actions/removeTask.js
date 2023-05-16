import { REMOVE_TODO } from "../constants";

export const removeTask = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});
