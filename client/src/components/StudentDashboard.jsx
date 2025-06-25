import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";



const StudentDashboard = () => {
const [fileMap, setFileMap] = useState({});

    // <div className="p-8">
    //   <h1 className="text-3xl font-bold">Student Dashboard</h1>
    //   <p>Welcome, Student! Complete and submit your assigned tasks.</p>
      
    // </div>
    const token = useSelector((state) => state.auth.token);
          const [tasks, setTasks] = useState([]);
          const [editingTaskId, setEditingTaskId] = useState(null);
          const [editForm, setEditForm] = useState({
            title: '',
            description: '',
            deadline: '',
          });
          const handleFileChange = (e, taskId) => {
  setFileMap({ ...fileMap, [taskId]: e.target.files[0] });
};
const handleSubmitTask = async (taskId) => {
  const file = fileMap[taskId];
  if (!file) return alert("Please select a file!");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("taskId", taskId);

  try {
    const res = await fetch(`https://task-management-app-1-aw93.onrender.com/taskApi/submit/${taskId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await res.json();
    if (res.ok) {
      alert("Submitted successfully!");
      setFileMap((prev) => ({ ...prev, [taskId]: null }));
      fetchStudentTasks(); 
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error("Submit error", err);
  }
};

const fetchStudentTasks = async () => {
  try {
    const res = await fetch("https://task-management-app-1-aw93.onrender.com/taskApi/my-tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTasks(data);
  } catch (error) {
    console.error("Error fetching student tasks:", error);
  }
};
        useEffect(() => {

  fetchStudentTasks();
}, []);
      return (
        <div className="p-8">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <p>Welcome, Student! Complete and submit your assigned tasks.</p>
      
  
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
                <th className="py-3 px-4 border">Upload</th>
<th className="py-3 px-4 border">Action</th>
<th className="py-3 px-4 border">Status</th>
                
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
                    <td className="py-2 px-4 border">
  <input
    type="file"
    onChange={(e) => handleFileChange(e, task._id)}
    className="text-xs"
  />
</td>
<td className="py-2 px-4 border text-center">
  <button
    onClick={() => handleSubmitTask(task._id)}
    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
  >
    Submit
  </button>
</td>
<td className="py-2 px-4 border text-center">
 <span
  className={`px-2 py-1 rounded-full text-white text-xs ${
    task.submission?.status === 'submitted' ? 'bg-green-500' : 'bg-yellow-500'
  }`}
>
  {task.submission?.status || 'pending'}
</span>
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
        </div>
       
        </div>
  );
};
export default StudentDashboard;
