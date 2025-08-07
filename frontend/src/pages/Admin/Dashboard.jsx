import StatsCard from "../../component/Admin/StatsCard";

const Dashboard = () => {
  const statsCards = [
    { title: "Total Employees", value: "142" },
    { title: "Departments", value: "8" },
    { title: "Present Today", value: "128" },
    { title: "Pending Requests", value: "7" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <StatsCard key={index} title={card.title} value={card.value} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span>John Doe checked in</span>
            <span className="text-gray-500 text-sm">9:15 AM</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span>Sarah Wilson submitted leave request</span>
            <span className="text-gray-500 text-sm">8:45 AM</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Mike Johnson checked out</span>
            <span className="text-gray-500 text-sm">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
