import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AssignTaskForm = () => {
  const token = useSelector((state) => state.auth.token);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
  });

  useEffect(() => {
    // fetch students
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:3000/authApi/userData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setStudents(data.users || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/teacherassigntask/assign-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Task assigned!");
        setForm({ title: "", description: "", deadline: "", assignedTo: "" });
      } else {
        alert(result.message || "Error assigning task");
      }
    } catch (err) {
      console.error("Assign error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Assign Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
        required
      />
      <select
        name="assignedTo"
        value={form.assignedTo}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
        required
      >
        <option value="">-- Select Student --</option>
        {students
          .filter((u) => u.role === "student")
          .map((student) => (
            <option key={student._id} value={student._id}>
              {student.username}
            </option>
          ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Assign Task
      </button>
    </form>
  );
};

export default AssignTaskForm;
