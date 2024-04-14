import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserNav from "./UserNav";
import UserFooter from "./UserFooter";
import { axiosUserInstance } from "../../utils/axios/axios";

function BookingVerification() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const turfId = queryParams.get("turfId");
  const date = queryParams.get("date");
  const selectedStartTime= queryParams.get("selectedStartTime");
  const selectedEndTime= queryParams.get("selectedEndTime");
  const totalPrice= queryParams.get("totalPrice");
  const paymentMethod = queryParams.get("paymentMethod");

  useEffect(() => {
    console.log("Turf ID:", turfId);
    console.log("Date:", date);
    console.log("Selected Start:", selectedStartTime);
    console.log("Selected end:", selectedEndTime);
    console.log("Payment Method:", paymentMethod);
    console.log('price',totalPrice)

    const storeBooking = async () => {
      try {
        const response = await axiosUserInstance.post("/create-booking", {
          turfId: turfId,
          date: date,
          selectedStartTime:selectedStartTime,
          selectedEndTime:selectedEndTime,
          paymentMethod: paymentMethod,
          totalPrice:totalPrice
        });
        console.log("Booking stored:", response.data);
      } catch (error) {
        console.error("Error storing booking:", error);
      }
    };

    storeBooking(); 
  }, [turfId, date,totalPrice ,selectedStartTime,selectedEndTime, paymentMethod]);

  return (
    <>
      <UserNav />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-black">
              Booking Confirmed!
            </h1>
            <p className="text-gray-500">
              You have successfully booked PLAY PITCH.
            </p>
          </div>
          <a
            href="/booking"
            className="block w-full mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out"
          >
            View Bookings
          </a>
        </div>
      </div>
      <UserFooter />
    </>
  );
}

export default BookingVerification;
