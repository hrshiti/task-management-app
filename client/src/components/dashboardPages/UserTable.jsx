import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
const [editFormData, setEditFormData] = useState({
  username: '',
  email: '',
  number: '',
  role: '',
});

const token = useSelector((state) => state.auth.token);
const handleEdit = (user) => {
  setEditingUser(user._id);
  setEditFormData({
    username: user.username,
    email: user.email,
    number: user.number,
    role: user.role,
  });
};

const handleUpdate = async (e, id) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:3000/authApi/updateUser/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setEditingUser(null);
      fetchUsers(); 
    } else {
      alert(data.message || "Update failed");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Something went wrong while updating the user.");
  }
};

const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this user?");
  if (!confirm) return;

  try {
    const res = await fetch(`http://localhost:3000/authApi/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); 
    } else {
      alert(data.message || "Delete failed");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Something went wrong while deleting the user.");
  }
};


  const fetchUsers = async () => {
    
    try {
      


      const res = await fetch("http://localhost:3000/authApi/userData", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 my-4">User Details</h2>
        <table className="min-w-full table-auto border-collapse text-sm md:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 border">#</th>
              <th className="py-3 px-4 border">Username</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Number</th>
              <th className="py-3 px-4 border">Role</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">{user.username}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.number}</td>
                  <td className="py-2 px-4 border capitalize">{user.role}</td>
                  <td className="py-2 px-4 border text-center space-x-2">
  <button
    onClick={() => handleEdit(user)}
    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(user._id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
  >
    Delete
  </button>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No user data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <div className="max-w-6xl mx-auto bg-white mt-6 p-4 shadow-md rounded">
          <h3 className="text-xl font-semibold mb-4">Edit User</h3>
          <form
            onSubmit={(e) => handleUpdate(e, editingUser)}
            className="grid md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Username"
              value={editFormData.username}
              onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={editFormData.email}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Number"
              value={editFormData.number}
              onChange={(e) => setEditFormData({ ...editFormData, number: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <select
              value={editFormData.role}
              onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
              className="border px-3 py-2 rounded"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
      
            <div className="md:col-span-2 flex gap-4 justify-end mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
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

export default UserTable;
