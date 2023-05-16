import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import TodoList from "./components/TodoList/TodoList";
import { addArray } from "./redux/actions/addArray";

import "./App.scss";

const App = () => {
  const initialState = JSON.parse(localStorage.getItem("todo")) || [];

  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const dispatch = useDispatch();

  const todos = useSelector((store) => store.todos.todos);

  useEffect(() => {
    return () => {
      localStorage.setItem("todo", JSON.stringify(todos));
    };
  }, []);
  // problem is here, problem in me
  // как иметь обновленное значение стэйта в функции willUnmount useEffect

  useEffect(() => {
    if (initialState) {
      dispatch(addArray(initialState));
    }
  }, []);

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
