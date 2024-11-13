// src/components/Todo/TodoList.js
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [edit, setEdit] = useState({ id: null, value: "" });
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newEntry = {
      id: Math.floor(Math.random() * 10000),
      text: newTodo,
      isComplete: false,
    };
    setTodos([newEntry, ...todos]);
    setNewTodo("");
  };

  const removeTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const completeTodo = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );

  const handleEditChange = (e) => setEdit({ ...edit, value: e.target.value });

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!edit.value.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === edit.id ? { ...todo, text: edit.value } : todo
      )
    );
    setEdit({ id: null, value: "" });
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="heading">What's the Plan for Today?</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Add a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {edit.id && (
        <form onSubmit={handleUpdateSubmit}>
          <input type="text" value={edit.value} onChange={handleEditChange} />
          <button type="submit">Update</button>
        </form>
      )}
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`todo-row ${todo.isComplete ? "complete" : ""}`}
        >
          <div className="task" onClick={() => completeTodo(todo.id)}>
            {todo.text}
          </div>
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className="delete-icon"
            />
            <TiEdit
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
              className="edit-icon"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
