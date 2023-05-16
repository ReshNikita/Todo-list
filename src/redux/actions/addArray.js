import { ADD_ARRAY } from "../constants";

export const addArray = (todos) => ({
  type: ADD_ARRAY,
  payload: todos,
});
