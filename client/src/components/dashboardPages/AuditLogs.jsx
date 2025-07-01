import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AuditLogs = () => {
  const token = useSelector((state) => state.auth.token);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("https://task-management-app-1-aw93.onrender.com/auditlogs/audit", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("Audit logs fetched:", data); // Debugging line
        setLogs(data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto mt-10 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Audit Logs</h2>
      <table className="min-w-full table-auto border-collapse text-sm md:text-base">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">User</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Action</th>
            <th className="py-2 px-4 border">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={log._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border">{log.user?.username || "N/A"}</td>
                <td className="py-2 px-4 border">{log.user?.email || "N/A"}</td>
                <td className="py-2 px-4 border">{log.action}</td>
                <td className="py-2 px-4 border">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogs;
