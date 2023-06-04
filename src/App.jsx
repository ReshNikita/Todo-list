import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import Form from "./components/Form";
import Todos from "./components/Todos";

import { deleteAll } from "./redux/actions/deleteAll";

const App = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  localStorage.setItem("todos", JSON.stringify(todos));

  const [editFormVisibility, setEditFormVisibility] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  const handleEditClick = (todo) => {
    setEditFormVisibility(true);
    setEditTodo(todo);
  };

  const cancelUpdate = () => {
    setEditFormVisibility(false);
  };

  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <Form
        editFormVisibility={editFormVisibility}
        editTodo={editTodo}
        cancelUpdate={cancelUpdate}
      />
      <Todos
        handleEditClick={handleEditClick}
        editFormVisibility={editFormVisibility}
      />
      {todos.length > 1 && (
        <button
          className="container__button delete-all"
          onClick={() => dispatch(deleteAll())}
        >
          DELETE ALL
        </button>
      )}
    </div>
  );
};

export default App;
