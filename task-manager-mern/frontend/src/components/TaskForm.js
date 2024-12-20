import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({ title: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', task);
      setTask({ title: '', description: '' });
      fetchTasks();
      toast.success('Task added successfully!', { autoClose: 3000 });
    } catch (error) {
      toast.error('Error adding task.', { autoClose: 3000 });
    }
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">Add New Task</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="form-input"
        />
        <textarea
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="form-textarea"
        />
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;