import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TaskTable = () => {
  const token = useSelector((state) => state.auth.token);
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const fetchTasks = async () => {
    try {
      const res = await fetch('https://task-management-app-9.onrender.com/taskApi/gettask', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://task-management-app-9.onrender.com/taskApi/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  
  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      deadline: task.deadline.slice(0, 10), 
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://task-management-app-9.onrender.com/taskApi/update/${editingTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Task updated");
        setEditingTaskId(null);
        fetchTasks();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto mt-10 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">All Tasks</h2>
      <table className="min-w-full table-auto border-collapse text-sm md:text-base">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 border">#</th>
            <th className="py-3 px-4 border">Title</th>
            <th className="py-3 px-4 border">Description</th>
            <th className="py-3 px-4 border">Deadline</th>
            <th className="py-3 px-4 border">Assigned To</th>
            <th className="py-3 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border">{task.title}</td>
                <td className="py-2 px-4 border">{task.description}</td>
                <td className="py-2 px-4 border">{task.deadline?.slice(0, 10)}</td>
                <td className="py-2 px-4 border">{task.assignedTo?.username || "N/A"}</td>
                <td className="py-2 px-4 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingTaskId && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Edit Task</h3>
          <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="date"
              value={editForm.deadline}
              onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="border px-3 py-2 rounded md:col-span-2"
              rows="3"
            ></textarea>
            <div className="flex gap-4 md:col-span-2 justify-end">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditingTaskId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
