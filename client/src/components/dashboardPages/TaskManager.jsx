import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TaskForm = ({ onTaskCreated }) => {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
  });
// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

  useEffect(() => {
    const fetchUsers = async () => {
  try {
    const res = await fetch("https://task-management-app-1-aw93.onrender.com/authApi/userData", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch users");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format");
    }

    const filtered = data.filter(user => user.role !== 'admin');
    setUsers(filtered);
  } catch (err) {
    console.error("Error fetching users:", err.message);
  }
};

    fetchUsers();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://task-management-app-1-aw93.onrender.com/taskApi/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Task Created");
        setFormData({ title: '', description: '', deadline: '', assignedTo: '' });
        if (onTaskCreated) onTaskCreated(data.task); 
      } else {
        alert(data.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task");
    }
  };
useEffect(() => {
  console.log("Token:", token);
}, [token]);
  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          required
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Assign To</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.role})
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded w-full transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
