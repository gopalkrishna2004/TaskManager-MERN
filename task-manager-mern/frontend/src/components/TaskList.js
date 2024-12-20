import React, { useState } from 'react';
import './TaskList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ tasks, fetchTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
      toast.success('Task deleted successfully!', { autoClose: 3000 });
    } catch (error) {
      toast.error('Error deleting task.', { autoClose: 3000 });
    }
  };

  const completeTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true }),
      });
      fetchTasks();
      toast.success('Task marked as completed!', { autoClose: 3000 });
    } catch (error) {
      toast.error('Error completing task.', { autoClose: 3000 });
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:5000/tasks/${editingTask._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
      });
      fetchTasks();
      setEditingTask(null);
      toast.success('Task updated successfully!', { autoClose: 3000 });
    } catch (error) {
      toast.error('Error updating task.', { autoClose: 3000 });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'pending') return !task.isCompleted;
    return true; // 'all' filter
  });

  return (
    <div className="task-container">
      <h1 className="task-header-title">Tasks</h1>

      <ToastContainer />

      {/* Filter Dropdown */}
      <div className="task-filter">
        <label htmlFor="filter">Filter Tasks: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task._id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            {editingTask && editingTask._id === task._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="edit-input"
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="edit-textarea"
                />
                <div className="button-group">
                  <button onClick={updateTask} className="button save-button">
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="button cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="task-header">
                  {!task.isCompleted && (
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => completeTask(task._id)}
                      className="task-checkbox"
                    />
                  )}
                  <div className="task-content">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                  </div>
                </div>

                {!task.isCompleted && (
                  <div className="button-group">
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="button delete-button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editTask(task)}
                      className="button edit-button"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
