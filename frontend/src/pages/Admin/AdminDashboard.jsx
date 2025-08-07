import { useState } from "react";
import Dashboard from "./Dashboard";
import SideBar from "../../component/Admin/SideBar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;

      case "employees":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Employees</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Employee
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p>Employee list and management </p>
            </div>
          </div>
        );

      case "departments":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Departments</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add Department
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p>Department list and management </p>
            </div>
          </div>
        );

      case "attendance":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Attendance</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p>Attendance tracking </p>
            </div>
          </div>
        );

      case "leave-requests":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Leave Requests</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p>Leave request management </p>
            </div>
          </div>
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
