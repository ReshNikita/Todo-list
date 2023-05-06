import { ADD_TODO } from "../constants";

export const addTask = (id, todo, isCompleted) => ({
  type: ADD_TODO,
  id,
  todo,
  isCompleted,
});
