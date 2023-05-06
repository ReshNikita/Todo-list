import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/actions/addTask";
import { useDispatch, useSelector } from "react-redux";

import "./Todo.scss";

const Todo = ({ todos, setTodos, editTodo, setEditTodo }) => {
  //input, setInput,
  const inputRef = useRef();
  const dispatch = useDispatch();
  const input = useSelector((store) => store);

  useEffect(() => {
    inputRef.current.focus();
  }, [editTodo, input]);

  // useEffect(() => {
  //   if (editTodo) {
  //     setInput(editTodo.title);
  //   } else {
  //     setInput("");
  //   }
  // }, [setInput, editTodo]);

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      //setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <form className="Todo" onSubmit={onFormSubmit}>
      <input
        type="text"
        maxLength={50}
        className="Todo__input"
        placeholder="Enter a todo..."
        required
        ref={inputRef}
        value={input}
        //onChange={(e) => setInput(e.target.value)}
        onChange={(e) => dispatch(addTask(e.target.value))}
      />
      <button className="Todo__button">{editTodo ? "OK" : "ADD"}</button>
    </form>
  );
};

export default Todo;
