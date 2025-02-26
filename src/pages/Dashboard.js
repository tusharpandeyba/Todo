import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/Tasklist";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setTasks(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header Section */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">My Todo List</h1>
          <div className="user-controls">
            <span className="user-avatar">👨</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Task Form */}
        <div className="form-container">
          <TaskForm onTaskAdded={(task) => setTasks([...tasks, task])} />
        </div>

        {/* Task List or Empty Message */}
        <div className="tasks-container">
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onDelete={(id) => setTasks(tasks.filter((task) => task._id !== id))}
              onToggle={(updatedTask) =>
                setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)))
              }
            />
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <p>You have no tasks yet. Add some?</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Global styles */
        .dashboard-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e2e8ff 100%);
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Container styles */
        .dashboard-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        /* Header styles */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
          color: white;
        }
        
        .dashboard-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.5px;
        }
        
        .user-controls {
          display: flex;
          align-items: center;
        }
        
        .user-avatar {
          font-size: 1.2rem;
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        
        .user-avatar:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        .logout-button {
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .logout-button:hover {
          background-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }
        
        .logout-button:active {
          transform: translateY(0);
        }
        
        /* Form container styles */
        .form-container {
          padding: 2rem;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        
        /* Task list container styles */
        .tasks-container {
          padding: 0 0 2rem 0;
          background-color: #ffffff;
        }
        
        /* Empty state styles */
        .empty-state {
          padding: 3rem 2rem;
          text-align: center;
          color: #6b7280;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }
        
        .empty-state-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .empty-state p {
          font-size: 1.1rem;
          margin: 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .dashboard-container {
            border-radius: 10px;
          }
          
          .dashboard-header {
            padding: 1.2rem 1.5rem;
          }
          
          .dashboard-title {
            font-size: 1.5rem;
          }
          
          .form-container {
            padding: 1.5rem;
          }
          
          .empty-state {
            padding: 2rem 1rem;
          }
        }
      `}</style>

      {/* TaskForm Component Styles */}
      <style jsx global>{`
        /* Task Form Styles */
        .task-form {
          background-color: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .task-form form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .task-form .form-title {
          color: #4b5563;
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }
        
        .task-form .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .task-form .input-group {
          width: 100%;
        }
        
        .task-form .input-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
        }
        
        .task-form .title-input,
        .task-form .description-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          transition: all 0.2s;
          color: #374151;
        }
        
        .task-form .title-input:focus,
        .task-form .description-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .task-form .title-input::placeholder,
        .task-form .description-input::placeholder {
          color: #9ca3af;
        }
        
        .task-form .description-input {
          min-height: 100px;
          resize: vertical;
          line-height: 1.5;
        }
        
        .task-form .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5rem;
        }
        
        .task-form .add-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .task-form .add-button:hover {
          background-color: #4338ca;
          transform: translateY(-1px);
        }
        
        .task-form .add-button:active {
          transform: translateY(0);
        }
      `}</style>

      {/* TaskList Component Styles */}
      <style jsx global>{`
        /* Task List Styles */
        .task-list {
          padding: 0 1.5rem;
        }
        
        .task-list .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0.5rem 1rem;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .task-list .list-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }
        
        .task-list .task-stats {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .task-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .task-list .task-item {
          display: flex;
          align-items: center;
          justify-content: space-between; /* Changed: Push content to sides */
          padding: 1.25rem 0.75rem;
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.15s;
        }
        
        .task-list .task-item:hover {
          background-color: #f9fafb;
        }
        
        .task-list .task-item:last-child {
          border-bottom: none;
        }
        
        .task-list .task-content {
          display: flex;
          align-items: flex-start;
          flex: 1;
          margin-right: 2rem; /* Added: Space between content and actions */
        }
        
        .task-list .task-checkbox-wrapper {
          margin-right: 1rem;
          padding-top: 0.25rem;
        }
        
        .task-list .task-checkbox {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid #d1d5db;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        
        .task-list .task-checkbox:checked {
          background-color: #4f46e5;
          border-color: #4f46e5;
        }
        
        .task-list .task-checkbox:checked::after {
          content: '✓';
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          line-height: 1;
        }
        
        .task-list .task-checkbox:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .task-list .task-details {
          flex: 1;
        }
        
        .task-list .task-title {
          font-size: 1.1rem;
          font-weight: 500;
          color: #111827;
          margin: 0 0 0.4rem 0;
          transition: all 0.2s;
        }
        
        .task-list .task-item.completed .task-title {
          color: #9ca3af;
          text-decoration: line-through;
        }
        
        .task-list .task-description {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0 0 0.6rem 0;
          line-height: 1.5;
        }
        
        .task-list .task-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.75rem;
          color: #9ca3af;
        }
        
        .task-list .task-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .task-list .task-priority {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          font-weight: 500;
        }
        
        /* Task Controls - Moved to the right */
        .task-list .task-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          justify-content: flex-end; /* Changed: Align to right */
          min-width: 80px; /* Added: Ensure consistent space */
        }
        
        .task-list .edit-button,
        .task-list .delete-button,
        .task-list .complete-button {
          background-color: transparent;
          border: none;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0.7;
        }
        
        .task-list .edit-button {
          color: #4b5563;
        }
        
        .task-list .edit-button:hover {
          background-color: #f3f4f6;
          opacity: 1;
        }
        
        .task-list .complete-button {
          color: #10b981;
        }
        
        .task-list .complete-button:hover {
          background-color: #ecfdf5;
          opacity: 1;
        }
        
        .task-list .delete-button {
          color: #ef4444;
          font-size: 1.25rem;
        }
        
        .task-list .delete-button:hover {
          background-color: #fee2e2;
          opacity: 1;
        }
        
        .task-list .no-tasks {
          padding: 2rem;
          text-align: center;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;