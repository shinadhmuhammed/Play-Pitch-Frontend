import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { axiosOwnerInstance } from '../../utils/axios/axios';
import Navbar from './Navbar';

interface DashboardData {
  totalRevenueToday: number;
  totalRevenueThisMonth: number;
  totalRevenueThisYear: number;
  totalBookingsToday: number;
  totalBookingsThisMonth: number;
  totalBookingsThisYear: number;
}

const OwnerDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [filter, setFilter] = useState<string>('daily'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosOwnerInstance.get<DashboardData>('/owner/dashboard-data');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  },[]);

  useEffect(() => {
    if (dashboardData) {
      const revenueChartCtx = document.getElementById('revenue-chart') as HTMLCanvasElement;
      const bookingsChartCtx = document.getElementById('bookings-chart') as HTMLCanvasElement;

      Chart.getChart(revenueChartCtx)?.destroy();
      Chart.getChart(bookingsChartCtx)?.destroy();

      const labels = getLabels();
      const revenueData = getRevenueData();
      const bookingsData = getBookingsData();

      new Chart(revenueChartCtx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      new Chart(bookingsChartCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bookings',
            data: bookingsData,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [dashboardData, filter]);

  const getLabels = () => {
    switch (filter) {
      case 'daily':
        return ['Today'];
      case 'monthly':
        return ['This Month'];
      case 'yearly':
        return ['This Year'];
      default:
        return [];
    }
  };

  const getRevenueData = () => {
    switch (filter) {
      case 'daily':
        return [dashboardData?.totalRevenueToday || 0];
      case 'monthly':
        return [dashboardData?.totalRevenueThisMonth || 0];
      case 'yearly':
        return [dashboardData?.totalRevenueThisYear || 0];
      default:
        return [];
    }
  };

  const getBookingsData = () => {
    switch (filter) {
      case 'daily':
        return [dashboardData?.totalBookingsToday || 0];
      case 'monthly':
        return [dashboardData?.totalBookingsThisMonth || 0];
      case 'yearly':
        return [dashboardData?.totalBookingsThisYear || 0];
      default:
        return [];
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="mb-4">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 ml-5">
            Filter
          </label>
          <select
            id="filter"
            name="filter"
            className="mt-1 block pl-3 pr-10 py-2 text-base ml-3 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white shadow-sm"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
       
  
        {dashboardData !== null && (
          <>
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <div className="flex flex-col space-y-2">
                <p className="text-sm">Today: ${dashboardData.totalRevenueToday}</p>
                <p className="text-sm">This Month: ${dashboardData.totalRevenueThisMonth}</p>
                <p className="text-sm">This Year: ${dashboardData.totalRevenueThisYear}</p>
              </div>
            </div>
  
            <div className="bg-gray-200 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
              <div className="flex flex-col space-y-2">
                <p className="text-sm">Today: {dashboardData.totalBookingsToday}</p>
                <p className="text-sm">This Month: {dashboardData.totalBookingsThisMonth}</p>
                <p className="text-sm">This Year: {dashboardData.totalBookingsThisYear}</p>
              </div>
            
            </div>
            
  
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Revenue Chart</h3>
              <canvas id="revenue-chart" className="w-full h-48"></canvas>
            </div>
  
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Bookings Chart</h3>
              <canvas id="bookings-chart" className="w-full h-48"></canvas>
            </div>
          </>
        )}
      </div>
    </div>
  );
}  

export default OwnerDashboard;
