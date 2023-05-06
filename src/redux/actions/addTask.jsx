import { ADD_TODO } from "../constants";

export const addTask = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});
