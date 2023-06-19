import { useState } from "react";

import Header from "./Header/Header";
import Form from "./Form";
import Todos from "./Todos";
import { todoAPI } from "../redux/todoAPI";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

import "../styles/TodoLayout.scss";

const TodoLayout = () => {
  const [editFormVisibility, setEditFormVisibility] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const { isLoading } = todoAPI.useGetTodosQuery("");

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
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default TodoLayout;
