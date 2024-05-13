import { useEffect, useState } from "react";
import NavAdmin from "./NavAdmin";
import { axiosAdminInstance } from "../../utils/axios/axios";
import { Line } from "react-chartjs-2";

interface DashboardData {
  totalBookings: number;
  totalUser: number;
  todayBookings: number;
  monthlyBookings: number;
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  console.log(dashboardData?.monthlyBookings)


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosAdminInstance.get("/admin/dashboard");
        setDashboardData(response.data);
        console.log(response.data)
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
          label: "Data",
          data: [todayBookings, monthlyBookings],
          fill: false,
          backgroundColor: ["rgb(75, 192, 192)", "rgb(54, 162, 235)"],
          borderColor: ["rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)"],
        },
      ],
    };

    return (
      <div className="w-full h-96 mt-4"> 
        <Line data={data} options={{ maintainAspectRatio: false }} /> 
      </div>
    );
  };
  

  return (
    <div>
      <NavAdmin />
      <div>
        {dashboardData && (
          <div>
      <div className="grid grid-cols-2 gap-4">
  <div className="bg-gray-100 border border-gray-300 p-9 ml-10 mr-10 mt-10 rounded-md flex items-center">
    <h2 className="text-lg font-semibold">{dashboardData ? `Total Users: ${dashboardData.totalUser}` : 'Loading...'}</h2>
  </div>
  <div className="bg-gray-100 border border-gray-300 p-4 mt-10 ml-10 mr-10 rounded-md flex items-center">
    <h2 className="text-lg font-semibold">{dashboardData ? `Total Bookings: ${dashboardData.totalBookings}` : 'Loading...'}</h2>
  </div>
</div>



            {renderChart()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
