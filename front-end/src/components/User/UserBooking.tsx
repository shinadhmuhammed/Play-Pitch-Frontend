import { useEffect, useState } from "react";
import Profiles from "./Profiles";
import UserNav from "./UserNav";
import { axiosUserInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";

interface Booking {
  _id: string;
  date: string;
  selectedSlot: string;
  bookingStatus: string;
  totalPrice: number;
  paymentMethod: string;
}

function UserBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/booking");
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosUserInstance.get("/getbooking");
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);

  useEffect(() => {
    if (statusFilter === null) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) => booking.bookingStatus === statusFilter
      );
      setFilteredBookings(filtered);
    }
  }, [statusFilter, bookings]);

  const handleFilter = (status: string) => {
    setStatusFilter(status);
  };

  return (
    <div className="">
      <UserNav />
      <div className="flex">
        <Profiles />
        <div className="mr-96 p-10">
          <h1 className="text-green-950">All Bookings</h1>
          <div className="flex justify-center mb-4">
            <button
              className={`mr-4 text-sm text-blue-600 ${
                statusFilter === "requested" ? "underline" : ""
              } hover:text-blue-700 hover:underline focus:outline-none focus:text-blue-700 focus:underline`}
              onClick={() => handleFilter("requested")}
            >
              Requested
            </button>
            <button
              className={`mr-4 text-sm text-green-600 ${
                statusFilter === "confirmed" ? "underline" : ""
              } hover:text-green-700 hover:underline focus:outline-none focus:text-green-700 focus:underline`}
              onClick={() => handleFilter("confirmed")}
            >
              Confirmed
            </button>
            <button
              className={`text-sm text-red-600 ${
                statusFilter === "declined" ? "underline" : ""
              } hover:text-red-700 hover:underline focus:outline-none focus:text-red-700 focus:underline`}
              onClick={() => handleFilter("declined")}
            >
              Declined
            </button>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Selected Slot
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Booking Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  TotalPrice
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {booking.selectedSlot}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {booking.bookingStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {booking.totalPrice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {booking.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-700 focus:outline-none focus:text-blue-700"
                      onClick={() =>
                        navigate(`/booking/${booking._id}`, {
                          state: { booking },
                        })
                      }
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserBooking;
