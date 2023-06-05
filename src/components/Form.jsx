import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addTodo } from "../redux/todosSlice";
import { updateTodo } from "../redux/todosSlice";

const Form = ({ editFormVisibility, editTodo, cancelUpdate }) => {
  const dispatch = useDispatch();

  const [todoValue, setTodoValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    setEditValue(editTodo.todo);
  }, [editTodo]);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoObj = {
      id: uuidv4(),
      todo: todoValue,
      completed: false,
    };
    setTodoValue("");
    dispatch(addTodo(todoObj));
  };

  const editSubmit = (e) => {
    e.preventDefault();
    const editedObj = {
      id: editTodo.id,
      todo: editValue,
      completed: false,
    };
    setEditValue("");
    dispatch(updateTodo(editedObj)) && cancelUpdate();
  };

  return (
    <>
      {editFormVisibility === false ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-and-btn">
            <input
              type="text"
              className="form__input"
              placeholder="Add your todo..."
              required
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              ref={inputRef}
            />
            <button type="submit" className="form__submit-button">
              ADD
            </button>
          </div>
        </form>
      ) : (
        <form className="form" onSubmit={editSubmit}>
          <label className="form__updateItems">Update your todo-items</label>
          <div className="input-and-btn">
            <input
              type="text"
              className="form__input"
              required
              value={editValue || ""}
              onChange={(e) => setEditValue(e.target.value)}
              ref={inputRef}
            />
            <button type="submit" className="form__update-button">
              UPDATE
            </button>
          </div>
          <button
            type="button"
            className="form__back-button"
            onClick={cancelUpdate}
          >
            BACK
          </button>
        </form>
      )}
    </>
  );
};

export default Form;
