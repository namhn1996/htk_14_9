import React, { useEffect, useState } from "react";
import axios from "axios";

function TodoPage() {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleChangeInput = (e) => {
    setTodoName(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9999/api/v1/todos")
      .then((res) => setTodoList(res.data.todos))
      .catch((err) => console.log(err));
  }, [todoList]);

  const handleAddTodo = () => {
    axios
      .post("http://localhost:9999/api/v1/todos", { name: todoName })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeStatus = (id) => {
    axios
      .put(`http://localhost:9999/api/v1/todos/${id}`, { status: "completed" })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9999/api/v1/todos/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="bg-info text-center text-white fs-1 p-3">Todo list</h1>
      <div className="container ">
        <div className="d-flex justify-content-center gap-3 mt-4">
          <input type="text" value={todoName} onChange={handleChangeInput} />
          <div style={{ cursor: "pointer" }} onClick={() => handleAddTodo()}>
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-6">
            <h1 className=" text-center ">Uncompleted</h1>
            <ul style={{ listStyle: "none" }}>
              {todoList &&
                todoList
                  .filter((todo) => todo.status == "uncompleted")
                  .map((todo) => (
                    <li className="d-flex justify-content-between align-items-center bg-body-secondary my-3 p-3">
                      <span className="todo-name fs-4">{todo.name}</span>
                      <div>
                        <i
                          class="fa-solid fa-trash-can"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                          onClick={() => handleDelete(todo.id)}
                        ></i>
                        <i
                          class="fa-regular fa-circle-check"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                          onClick={() => handleChangeStatus(todo.id)}
                        ></i>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="col-6">
            <h1 className=" text-center ">Completed</h1>
            <ul style={{ listStyle: "none" }}>
              {todoList &&
                todoList
                  .filter((todo) => todo.status == "completed")
                  .map((todo) => (
                    <li className="d-flex justify-content-between align-items-center bg-body-secondary my-3 p-3">
                      <span className="todo-name fs-4">{todo.name}</span>
                      <div>
                        <i
                          class="fa-solid fa-trash-can"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                        ></i>
                        <i
                          class="fa-regular fa-circle-check"
                          style={{ paddingRight: "15px", cursor: "pointer" }}
                        ></i>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
