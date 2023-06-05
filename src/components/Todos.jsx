import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { completeTodo } from "../redux/todosSlice";
import { removeTodo } from "../redux/todosSlice";

const Todos = ({ handleEditClick, editFormVisibility }) => {
  const dispatch = useDispatch();

  const todos = useSelector((store) => store.todos.todos);

  const doneTask = (id) => {
    dispatch(completeTodo(id));
  };

  return todos.map((todo) => (
    <div key={todo.id} className="todo-box">
      <div className="todo__list">
        {editFormVisibility === false && (
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => doneTask(todo.id)}
          />
        )}
        <span
          style={
            todo.completed === true
              ? { textDecoration: "line-through", textDecorationColor: "red" }
              : { textDecoration: "none" }
          }
        >
          {todo.todo}
        </span>
      </div>
      <div className="actions-box">
        {editFormVisibility === false && (
          <>
            <span
              style={{ color: "#e2d209" }}
              onClick={() => handleEditClick(todo)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </span>
            <span
              style={{ color: "lightseagreen" }}
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </>
        )}
      </div>
    </div>
  ));
};

export default Todos;
