import { useState } from "react";
import { useSelector } from "react-redux";

import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import TodoList from "./components/TodoList/TodoList";

import "./App.scss";

const App = () => {
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const todos = useSelector((store) => store.todos.todos);
  localStorage.setItem("todos", JSON.stringify(todos));

  return (
    <div className="container">
      <div className="container__wrapper">
        <header>
          <Header />
        </header>
        <Todo
          todos={todos}
          input={input}
          setInput={setInput}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
        />
        <TodoList todos={todos} setEditTodo={setEditTodo} />
      </div>
    </div>
  );
};

export default App;
