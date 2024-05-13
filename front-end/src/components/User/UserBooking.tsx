import { useEffect, useState } from "react";
import Profiles from "./Profiles";
import UserNav from "./UserNav";
import { axiosUserInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import UserFooter from "./UserFooter";
import {
  faCalendarAlt,
  faClock,
  faMoneyBillAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const fetchBooking = async () => {
      try {
        const response = await axiosUserInstance.get("/getbooking");
        setBookings(response.data);
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
    <>
      <div
        className="relative"
        style={{
          backgroundImage: `url('/images/bg3.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <UserNav />

        <div className="flex">
          <Profiles />

          <div className="mr-96 p-20 w-full ml-16">
            <h1 className="text-green-950 font-bold">All Bookings</h1>
            <div className="flex justify-center mb-4">
              <button
                className={`mr-4 text-sm font-medium text-green-600 ${
                  statusFilter === "confirmed" ? "underline" : ""
                } hover:text-green-700 hover:underline focus:outline-none focus:text-green-700 focus:underline`}
                onClick={() => handleFilter("confirmed")}
              >
                Confirmed
              </button>
              <button
                className={`mr-4 text-sm font-medium text-red-600 ${
                  statusFilter === "cancelled" ? "underline" : ""
                } hover:text-red-700 hover:underline focus:outline-none focus:text-red-700 focus:underline`}
                onClick={() => handleFilter("cancelled")}
              >
                Cancelled
              </button>
              <button
                className={`mr-4 text-sm font-medium text-blue-600 ${
                  statusFilter === "completed" ? "underline" : ""
                } hover:text-blue-700 hover:underline focus:outline-none focus:text-blue-700 focus:underline`}
                onClick={() => handleFilter("completed")}
              >
                Completed
              </button>
            </div>

            {filteredBookings.length === 0 ? (
          <div className="flex justify-center items-center h-80">
          <div className="bg-gray-200 rounded-lg p-8 flex flex-col items-center">
            <img className="object-cover h-48" src="/images/football.jpeg" alt="No bookings" />
            <h1 className="text-lg font-bold mt-4">No bookings</h1>
          </div>
        </div>
        
          ) : (
            <div className="grid gap-4 w-full">
              {filteredBookings.map((booking) => {
                const currentDate = new Date();
                const bookingDateTime = new Date(
                  booking.date + " " + booking.selectedSlot.split(" - ")[0]
                );
                const isBookingOver = currentDate > bookingDateTime; 

                return (
                  <div
                    key={booking._id}
                    className={`border rounded-lg p-4 ${
                      isBookingOver ? "bg-gray-200" : ""
                    }`}
                  >
                    <p>
                      <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                      <strong>Date:</strong>{" "}
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faClock} />{" "}
                      <strong>Selected Slot:</strong> {booking.selectedSlot}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faMoneyBillAlt} />{" "}
                      <strong>Booking Status:</strong>{" "}
                      {isBookingOver ? "Completed" : booking.bookingStatus}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faMoneyBillAlt} />{" "}
                      <strong>Total Price:</strong> {booking.totalPrice}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faCreditCard} />{" "}
                      <strong>Payment Method:</strong> {booking.paymentMethod}
                    </p>

                    <div className="flex justify-center">
                      <button
                        className="focus:ring-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() =>
                          navigate(`/booking/${booking._id}`, {
                            state: { booking },
                          })
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <UserFooter />
    </div>
  </>
);
}

export default UserBooking;
