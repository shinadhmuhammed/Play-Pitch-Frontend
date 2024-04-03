import React, { useState, ChangeEvent, useEffect } from "react";
import UserNav from "./UserNav";
import { useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import { useStripe } from "@stripe/react-stripe-js";

interface TurfDetail {
  _id: string;
  turfName: string;
  openingTime: string;
  closingTime: string;
  price: number;
}

function Checkout() {
  const location = useLocation();
  const turfDetail: TurfDetail | undefined = location.state?.turfDetail;
  const stripe = useStripe();

  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [onlineChecked, setOnlineChecked] = useState<boolean>(false);
  const [slotsAvailable, setSlotsAvailable] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");

  const generateTimeSlots = () => {
    if (!turfDetail || !turfDetail.openingTime || !turfDetail.closingTime)
      return [];

    const openingHour = parseInt(turfDetail.openingTime.split(":")[0]);
    const closingHour = parseInt(turfDetail.closingTime.split(":")[0]);
    const timeSlots: string[] = [];

    for (let hour = openingHour; hour < closingHour; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        timeSlots.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return timeSlots;
  };

  const calculateTotalPrice = () => {
    if (selectedStartTime && selectedEndTime && turfDetail) {
      const startHour = parseInt(selectedStartTime.split(":")[0]);
      const startMinute = parseInt(selectedStartTime.split(":")[1]);
      const endHour = parseInt(selectedEndTime.split(":")[0]);
      const endMinute = parseInt(selectedEndTime.split(":")[1]);

      const durationInHours =
        endHour - startHour + (endMinute - startMinute) / 60;

      const totalPrice = durationInHours * turfDetail.price;
      setTotalPrice(totalPrice);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedStartTime, selectedEndTime, turfDetail]);

  useEffect(() => {
    if (selectedDate && selectedStartTime && selectedEndTime) {
      checkSlot();
    }
  }, [selectedDate, selectedStartTime, selectedEndTime]);

  const handleStartTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime(e.target.value);
    setSelectedEndTime("");
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndTime(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleOnlineCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOnlineChecked(e.target.checked);
  };

  const handleBooking = async () => {
    try {
      if (
        !selectedStartTime ||
        !selectedEndTime ||
        !selectedDate ||
        !totalPrice
      ) {
        setErrorMessage(
          "Please select start and end time, date, and calculate the total price."
        );
        return;
      }

      if (!onlineChecked) {
        setErrorMessage("Please select online payment method.");
        return;
      }

      if (turfDetail) {
        const stripeResponse = await axiosUserInstance.post("/stripepayment", {
          totalPrice: totalPrice,
          turfDetail: turfDetail,
          selectedDate: selectedDate,
          selectedStartTime: selectedStartTime,
          selectedEndTime: selectedEndTime,
        });
        const sessionId = stripeResponse.data.id;
        if (stripe) {
          stripe
            .redirectToCheckout({
              sessionId: sessionId,
            })
            .then(async (result) => {
              if (result.error) {
                console.error("Error redirecting to checkout:", result.error);
              } else {
                console.log("Booking successful!");
              }
            });
        } else {
          console.error("Stripe is not initialized.");
        }
      }
    } catch (error) {
      console.error("Error occurred while handling booking:", error);
    }
  };

  const checkSlot = async () => {
    try {
      const response = await axiosUserInstance.post("/slotavailability", {
        turfDetail,
        selectedDate: selectedDate,
        selectedStartTime,
        selectedEndTime,
      });
      setSlotsAvailable(response.data);
      if (!response.data) {
        setErrorMessage("Slot is not available ");
      } else {
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error checking slot availability:", error);
      setSlotsAvailable(false);
      setErrorMessage("Error checking slot availability");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNav />
      {turfDetail && (
        <div className="mx-auto max-w-2xl p-8">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-4xl mt-8 font-serif text-center">
            {turfDetail.turfName}
          </h1>

          <div className="mt-8">
            <p className="text-xl font-semibold">
              PricePerHour: ₹{turfDetail.price}
            </p>
            <div className="mt-4">
              <label
                htmlFor="startTime"
                className="block text-sm font-semibold mb-2"
              >
                Select Start Time
              </label>
              <select
                id="startTime"
                name="startTime"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleStartTimeChange}
                value={selectedStartTime}
              >
                <option value="">Select a start time</option>
                {generateTimeSlots().map((timeSlot, index) => (
                  <option key={index} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label
                htmlFor="endTime"
                className="block text-sm font-semibold mb-2"
              >
                Select End Time
              </label>
              <select
                id="endTime"
                name="endTime"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleEndTimeChange}
                value={selectedEndTime}
              >
                <option value="">Select an end time</option>
                {generateTimeSlots()
                  .filter(
                    (timeSlot) =>
                      timeSlot > selectedStartTime || !selectedStartTime
                  )
                  .map((timeSlot, index) => (
                    <option key={index} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-4">
              <label
                htmlFor="date"
                className="block text-sm font-semibold mb-2"
              >
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>

            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-600"
                  checked={onlineChecked}
                  onChange={handleOnlineCheckboxChange}
                />
                <span className="ml-2 text-sm">Online Payment</span>
              </label>
            </div>

            <button
              type="submit"
              onClick={handleBooking}
              disabled={!slotsAvailable}
              className={`mt-8 w-full bg-green-500 text-white font-semibold py-3 rounded-md focus:outline-none ${
                !slotsAvailable
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600 focus:bg-green-600"
              }`}
            >
              Pay
            </button>

            <p className="font-medium">Total Price: {totalPrice}</p>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      )}
      <UserFooter />
    </div>
  );
}

export default Checkout;
