import { useState, useEffect, useRef } from "react";

import { useAddTodoMutation, useUpdateTodoMutation } from "../redux/todoAPI";

import "../styles/Form.scss";

const Form = ({ editTodo, editFormVisibility, cancelUpdate }) => {
  const [todoValue, setTodoValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const inputRef = useRef(null);

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  useEffect(() => {
    setEditValue(editTodo.title);
  }, [editTodo]);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setTodoValue("");
    await addTodo({ title: todoValue });
  };

  const editSubmit = async e => {
    e.preventDefault();
    (await updateTodo({
      title: editValue,
      id: editTodo.id,
    }).unwrap()) && cancelUpdate();
    setEditValue("");
  };

  return (
    <>
      {editFormVisibility === false ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__box">
            <input
              type="text"
              className="form__input"
              placeholder="Add your todo..."
              required
              value={todoValue}
              onChange={e => setTodoValue(e.target.value)}
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
          <div className="form__box">
            <input
              type="text"
              className="form__input"
              required
              value={editValue || ""}
              onChange={e => setEditValue(e.target.value)}
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
