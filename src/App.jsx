import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import TodoList from "./components/TodoList/TodoList";

import "./App.scss";

const App = () => {
  const initialState = JSON.parse(localStorage.getItem("todo")) || [];
  //const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="container__wrapper">
        <header>
          <Header />
        </header>
        <Todo
          todos={todos}
          setTodos={setTodos}
          // input={input}
          // setInput={setInput}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />
        <TodoList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
      </div>
    </div>
  );
};

export default App;
