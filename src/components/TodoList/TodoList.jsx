import React from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { completeTodo, removeTodo, editTodo } from "../../redux/todosSlice";

import "./TodoList.scss";

const TodoList = ({ todos, setEditTodo }) => {
  const dispatch = useDispatch();

  const handleDelete = ({ id }) => {
    dispatch(removeTodo(id));
  };

  const handleComplete = (todo) => {
    dispatch(completeTodo(todo));
  };

  // const updateTodo = (title, id, completed) => {
  //   todos.map((todo) => (todo.id === id ? { title, id, completed } : todo));

  //   setEditTodo("");
  // };

  const handleEdit = ({ id }) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    dispatch(editTodo(foundTodo));
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
            onChange={(e) => {
              e.preventDefault();
              setEditTodo(e.target.value);
            }}
            onClick={() => handleEdit(todo)}
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
