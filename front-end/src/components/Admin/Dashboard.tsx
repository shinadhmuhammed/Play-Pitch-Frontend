import { useEffect, useState } from "react";
import NavAdmin from "./NavAdmin";
import { axiosAdminInstance } from "../../utils/axios/axios";
import { Line } from "react-chartjs-2";
import React from "react";
import { FaUsers, FaCalendarCheck, FaChartLine } from "react-icons/fa";

interface DashboardData {
  totalBookings: number;
  totalUser: number;
  todayBookings: number;
  monthlyBookings: number;
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosAdminInstance.get("/admin/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboard();
  }, []);

  const renderChart = () => {
    if (!dashboardData) return null;

    const { todayBookings, monthlyBookings } = dashboardData;

    const data = {
      labels: ["Today's Bookings", "Monthly Bookings"],
      datasets: [
        {
          label: "Bookings",
          data: [todayBookings, monthlyBookings],
          fill: false,
          backgroundColor: ["#60A5FA", "#34D399"],
          borderColor: ["#2563EB", "#059669"],
          tension: 0.1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg h-96 mt-8">
        <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>
        <Line data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavAdmin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        {dashboardData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="Total Users"
                value={dashboardData.totalUser}
                icon={<FaUsers className="text-blue-500" />}
              />
              <DashboardCard
                title="Total Bookings"
                value={dashboardData.totalBookings}
                icon={<FaCalendarCheck className="text-green-500" />}
              />
              <DashboardCard
                title="Today's Bookings"
                value={dashboardData.todayBookings}
                icon={<FaChartLine className="text-purple-500" />}
              />
            </div>
            {renderChart()}
          </>
        )}
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
    <div className="mr-4 text-3xl">{icon}</div>
    <div>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;