import { ADD_TODO } from "../constants";

export const addTodo = (id, todo, isCompleted) => ({
  type: ADD_TODO,
  id,
  todo,
  isCompleted,
});
