import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Header from "./Header/Header";
import Form from "./Form";
import Todos from "./Todos";
import { todoAPI } from "../redux/todoAPI";
import { deleteAll } from "../redux/todosSlice";

const TodoLayout = () => {
  const [editFormVisibility, setEditFormVisibility] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const dispatch = useDispatch();

  const { data: todos, isSuccess, error } = todoAPI.useGetTodosQuery("");

  const handleEditClick = todo => {
    setEditFormVisibility(true);
    setEditTodo(todo);
  };

  const cancelUpdate = () => {
    setEditFormVisibility(false);
  };

  return (
    <div className="container">
      <Header />
      <Form
        editTodo={editTodo}
        editFormVisibility={editFormVisibility}
        cancelUpdate={cancelUpdate}
      />
      <Todos
        handleEditClick={handleEditClick}
        editFormVisibility={editFormVisibility}
      />
      {/* {todos.length > 1 && (
        <button
          className="container__button delete-all"
          onClick={() => dispatch(deleteAll())}
        >
          DELETE ALL
        </button>
      )} */}
    </div>
  );
};

export default TodoLayout;
