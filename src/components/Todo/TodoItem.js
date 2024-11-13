// src/components/Todo/TodoItem.js
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import "./index.css";

const TodoItem = ({ todo, completeTodo, removeTodo, editTodo }) => {
  const { id, text, isComplete } = todo;

  const handleComplete = () => completeTodo(id);
  const handleRemove = () => removeTodo(id);
  const handleEdit = () => editTodo(todo);

  return (
    <div className={`todo-row ${isComplete ? "complete" : ""}`}>
      <button
        className="task"
        onClick={handleComplete}
        style={{ cursor: "pointer" }}
        aria-label={isComplete ? "Mark as incomplete" : "Mark as complete"}
      >
        {text}
      </button>
      <div className="icons">
        <button
          onClick={handleRemove}
          className="delete-icon"
          aria-label="Delete task"
        >
          <RiCloseCircleLine />
        </button>
        <button
          onClick={handleEdit}
          className="edit-icon"
          aria-label="Edit task"
        >
          <TiEdit />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
