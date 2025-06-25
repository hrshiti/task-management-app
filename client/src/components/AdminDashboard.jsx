import { Link } from "react-router-dom";
import UserTable from "./dashboardPages/UserTable";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin! You can manage users and tasks.</p>
      <div className="mt-6 space-x-4 flex flex-row ">

     <Link to="/tasks">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300">
    Assign Task
  </button>
</Link>
     <Link to="/tasktable">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300">
    TaskTable
  </button>
</Link>
      </div>
      
      <UserTable />
    </div>
  );
};
export default AdminDashboard;
