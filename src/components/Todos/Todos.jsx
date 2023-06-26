import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  useCompletedTodoMutation,
  useRemoveTodoMutation,
  useGetTodosQuery,
} from "../../redux/todoAPI";

import "./Todos.scss";

const Todos = ({ handleEditClick, editFormVisibility }) => {
  const { data: todos, isSuccess, error } = useGetTodosQuery("");
  const [done] = useCompletedTodoMutation();
  const [remove] = useRemoveTodoMutation();

  const doneTask = async id => {
    const res = await done(id);
    return res;
  };

  const removeTodo = async id => {
    const res = await remove(id);
    return res;
  };

  return (
    <>
      {error && <h1>Error...</h1>}
      {isSuccess && todos?.length !== 0 ? (
        todos.map(todo => (
          <section key={todo.id} className="todoBox">
            <div>
              {editFormVisibility === false && (
                <input
                  className="todoBox__input"
                  type="checkbox"
                  checked={todo.isCompleted}
                  id={todo.id}
                  onChange={() => doneTask(todo.id)}
                />
              )}
              <span
                className={
                  todo.isCompleted === true
                    ? "todoBox__completed"
                    : "todoBox__notCompleted"
                }
              >
                {todo.title}
              </span>
            </div>
            <div className="todoBox__actions-box">
              {!editFormVisibility && (
                <>
                  <span onClick={() => handleEditClick(todo)}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="todoBox__editClickButton"
                    />
                  </span>
                  <span onClick={() => removeTodo(todo.id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="todoBox__removeButton"
                    />
                  </span>
                </>
              )}
            </div>
          </section>
        ))
      ) : (
        <h2 className="noTodosYet">No todos yet...</h2>
      )}
    </>
  );
};

export default Todos;
