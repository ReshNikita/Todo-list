import React from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { removeTask } from "../../redux/actions/removeTask";
import { completeTodo } from "../../redux/actions/completeTodo";

import "./TodoList.scss";

const TodoList = ({ todos, setEditTodo }) => {
  const dispatch = useDispatch();

  const handleDelete = ({ id }) => {
    dispatch(removeTask(id));
  };

  const handleComplete = (id) => {
    dispatch(completeTodo(id));
  };

  const handleEdit = ({ id }) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    setEditTodo(foundTodo);
  };

  return (
    <div className="todo">
      {todos.map((todo) => (
        <li className="todo__list" key={todo.id}>
          <input
            type="text"
            size="50"
            maxLength={50}
            value={todo.title}
            className={`todo-list__input ${
              todo.completed ? "todo-list__complete" : ""
            }`}
            onChange={(e) => e.preventDefault()}
          />
          <div className="todo-list__buttons">
            <button
              className="todo-list__button-complete task-button"
              onClick={() => handleComplete(todo)}
            >
              <FontAwesomeIcon icon={faCheckSquare} />
            </button>
            <button
              className="todo-list__button-edit task-button"
              onClick={() => handleEdit(todo)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="todo-list__button-delete task-button"
              onClick={() => handleDelete(todo)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodoList;
