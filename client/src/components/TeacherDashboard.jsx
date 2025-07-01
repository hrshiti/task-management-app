import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [tasks, setTasks] = useState([]);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [marks, setMarks] = useState("");

  // const [editingTaskId, setEditingTaskId] = useState(null);
  // const [editForm, setEditForm] = useState({
  //   title: '',
  //   description: '',
  //   deadline: '',
  // });
  useEffect(() => {
    fetchTasks();
  }, []);
  //    try {
  //   const res = await fetch("https://task-management-app-1-aw93.onrender.com/taskApi/my-tasks", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await res.json();
  //   setTasks(data);
  // } catch (error) {
  //   console.error("Error fetching student tasks:", error);
  // }
  const handleEvaluate = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:3000/taskApi/evaluate/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback, marks }),
      });

      const data = await res.json();
      alert(data.message);

      fetchSubmittedTasks(); // refresh list
      setSelectedTask(null);
      setFeedback("");
      setMarks("");
    } catch (error) {
      console.error("Evaluation error:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch('https://task-management-app-1-aw93.onrender.com/taskApi/gettask', {
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
  const fetchSubmittedTasks = async () => {
    try {
      const res = await fetch("https://task-management-app-1-aw93.onrender.com/taskApi/submitted", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSubmittedTasks(data);
    } catch (err) {
      console.error("Error fetching submitted tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchSubmittedTasks();
  }, []);


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      <p>Welcome, Teacher! You can view tasks and evaluate students.</p>
      <Link to="/tasks">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300">
          Assign Task
        </button>
      </Link>
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
             
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <>
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">{task.title}</td>
                  <td className="py-2 px-4 border">{task.description}</td>
                  <td className="py-2 px-4 border">{task.deadline?.slice(0, 10)}</td>
                  <td className="py-2 px-4 border">{task.assignedTo?.username || "N/A"}</td>
                </tr>
 {task.comments?.length > 0 && (
                  <tr>
                    <td colSpan="5" className="bg-gray-100 p-4">
                      <strong>Comments:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        {task.comments.map((comment, idx) => (
                          <li key={idx}>
                            <span className="text-blue-700 font-medium">{comment.student?.username || 'Anonymous'}:</span> {comment.text}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
                </>
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
      </div>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-700">Submitted Tasks</h2>
      <table className="min-w-full table-auto border-collapse text-sm md:text-base">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Assigned To</th>
            <th className="py-2 px-4 border">Submitted At</th>
            <th className="py-2 px-4 border">File</th>
            <th className="py-2 px-4 border">Review</th>
          </tr>
        </thead>
        <tbody>
          {submittedTasks.length > 0 ? (
            submittedTasks.map((task, index) => (
              <tr key={task._id}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{task.title}</td>
                <td className="py-2 px-4 border">{task.assignedTo?.username}</td>
                <td className="py-2 px-4 border">{new Date(task.submission?.submittedAt).toLocaleString()}</td>
                <td className="py-2 px-4 border">
                  {task.submission?.fileUrl ? (
                    <a
                      href={`http://localhost:3000${task.submission.fileUrl}`}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Review
                  </button>
                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">No submissions found</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-center">Evaluate Task: {selectedTask.title}</h3>

            <textarea
              className="w-full p-2 border mb-2"
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write feedback..."
            ></textarea>

            <input
              type="number"
              className="w-full p-2 border mb-2"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Marks (e.g. 10)"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTask(null)}
                className="text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEvaluate(selectedTask._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

      )}

    </div>
  );
};
export default TeacherDashboard;
