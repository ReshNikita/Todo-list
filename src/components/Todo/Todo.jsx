import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import { addTodo } from "../../redux/todosSlice";

import "./Todo.scss";

const Todo = ({ input, setInput, todos, editTodo, setEditTodo }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, [editTodo, input]);

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const updateTodo = (title, id, completed) => {
    todos.map((todo) => (todo.id === id ? { title, id, completed } : todo));

    setEditTodo("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ title: input, id: uuidv4() }));
    if (!editTodo) {
      setInput("");
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
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="Todo__button">{editTodo ? "OK" : "ADD"}</button>
    </form>
  );
};

export default Todo;
