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
        setDashboardData(response.data);z
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Owner Dashboard</h1>
        <div className="mb-6">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter Data
          </label>
          <select
            id="filter"
            name="filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        {dashboardData !== null && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Total Revenue</h3>
              <div className="space-y-3">
                <p className="text-sm flex justify-between"><span>Today:</span> <span className="font-medium">${dashboardData.totalRevenueToday}</span></p>
                <p className="text-sm flex justify-between"><span>This Month:</span> <span className="font-medium">${dashboardData.totalRevenueThisMonth}</span></p>
                <p className="text-sm flex justify-between"><span>This Year:</span> <span className="font-medium">${dashboardData.totalRevenueThisYear}</span></p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Total Bookings</h3>
              <div className="space-y-3">
                <p className="text-sm flex justify-between"><span>Today:</span> <span className="font-medium">{dashboardData.totalBookingsToday}</span></p>
                <p className="text-sm flex justify-between"><span>This Month:</span> <span className="font-medium">{dashboardData.totalBookingsThisMonth}</span></p>
                <p className="text-sm flex justify-between"><span>This Year:</span> <span className="font-medium">{dashboardData.totalBookingsThisYear}</span></p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Revenue Chart</h3>
              <canvas id="revenue-chart" className="w-full h-64"></canvas>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Bookings Chart</h3>
              <canvas id="bookings-chart" className="w-full h-64"></canvas>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;
