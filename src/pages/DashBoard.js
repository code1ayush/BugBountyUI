// src/pages/Dashboard.js
export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Example card: Submitted Reports */}
        <div className="p-4 bg-white shadow rounded-2xl">
          <h3 className="mb-2 text-lg font-semibold">Submitted Reports</h3>
          <p className="text-gray-600">View all reports you have submitted.</p>
        </div>

        {/* Example card: Programs */}
        <div className="p-4 bg-white shadow rounded-2xl">
          <h3 className="mb-2 text-lg font-semibold">Programs</h3>
          <p className="text-gray-600">See active programs you can participate in.</p>
        </div>
      </div>
    </div>
  );
}

