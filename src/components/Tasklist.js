import React from "react";

const TaskList = ({ tasks, onDelete, onToggle }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    onDelete(id);
  };

  const handleToggle = async (task) => {
    const updatedTask = { ...task, is_completed: !task.is_completed };
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(updatedTask),
    });
    onToggle(updatedTask);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span style={{ textDecoration: task.is_completed ? "line-through" : "none" }}>
            {task.title} - {task.description}
          </span>
          <button onClick={() => handleToggle(task)}>{task.is_completed ? "Undo" : "Complete"}</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
