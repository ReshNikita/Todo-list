import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { todoAPI } from "../redux/todoAPI";

const Todos = ({ handleEditClick, editFormVisibility }) => {
  const { data: todos, isSuccess, error } = todoAPI.useGetTodosQuery("");

  const [done, {}] = todoAPI.useCompletedTodoMutation();

  const doneTask = async id => {
    const res = await done(id);
    return res;
  };

  const [remove, {}] = todoAPI.useRemoveTodoMutation();

  const removeTodo = async id => {
    const res = await remove(id);
    return res;
  };

  return (
    <>
      {error && <h1>Error...</h1>}
      {isSuccess && todos.length !== 0
        ? todos.map(todo => (
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
                      ? {
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }
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
                      onClick={() =>
                        //dispatch(removeTodo(todo.id))
                        removeTodo(todo.id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </>
                )}
              </div>
            </div>
          ))
        : "add"}
    </>
  );
};

export default Todos;
