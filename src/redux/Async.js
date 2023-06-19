import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: process.env.REACT_APP_HEROKU_URL,
  timeout: 1000,
  headers: { Authorization: "Bearer " + token },
});

export const getTodos = createAsyncThunk(
  "todos/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await instance.get("/todos");
      localStorage.setItem("todos", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      thunkApi.rejectWithValue("Couldn't load any todos");
    }
  }
);

export const addAsyncTodo = createAsyncThunk(
  "todos/fetchAddTodo",
  async (title, thunkApi) => {
    try {
      const response = await instance.post("/todos", title);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue("Couldn't add a todo");
    }
  }
);
