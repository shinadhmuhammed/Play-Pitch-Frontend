import React, { useState, ChangeEvent, useEffect } from "react";
import UserNav from "./UserNav";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import { useStripe } from "@stripe/react-stripe-js";
import ErrorModal from "../Modal/Error";
import SuccessModal from "../Modal/Success";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";

interface TurfDetail {
  turfOwner: string;
  _id: string;
  turfName: string;
  openingTime: string;
  closingTime: string;
  price: { [key: string]: string };
}

function Checkout() {
  const location = useLocation();
  const turfDetail: TurfDetail | undefined = location.state?.turfDetail;
  const stripe = useStripe();
  const navigate = useNavigate();

  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCourtType, setSelectedCourtType] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [onlineChecked, setOnlineChecked] = useState<boolean>(false);
  const [payWithWallet, setPayWithWallet] = useState<boolean>(false);
  const [slotsAvailable, setSlotsAvailable] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const generateTimeSlots = () => {
    if (
      !turfDetail ||
      !turfDetail.openingTime ||
      !turfDetail.closingTime ||
      !selectedDate
    )
      return [];

    const currentDate = new Date(selectedDate);
    const openingHour = parseInt(turfDetail.openingTime.split(":")[0]);
    const closingHour = parseInt(turfDetail.closingTime.split(":")[0]);
    const timeSlots: string[] = [];

    for (let hour = openingHour; hour < closingHour; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const slotDateTime = new Date(currentDate);
        slotDateTime.setHours(hour);
        slotDateTime.setMinutes(minute);
        if (slotDateTime > new Date()) {
          timeSlots.push(`${formattedHour}:${formattedMinute}`);
        }
      }
    }
    return timeSlots;
  };

  const handleOnlineCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOnlineChecked(e.target.checked);
    if (e.target.checked) {
      setPayWithWallet(false);
    }
  };

  const handleWalletCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayWithWallet(e.target.checked);
    if (e.target.checked) {
      setOnlineChecked(false);
    }
  };

  const calculateTotalPrice = () => {
    if (selectedStartTime && selectedEndTime && turfDetail) {
      const startHour = parseInt(selectedStartTime.split(":")[0]);
      const startMinute = parseInt(selectedStartTime.split(":")[1]);
      const endHour = parseInt(selectedEndTime.split(":")[0]);
      const endMinute = parseInt(selectedEndTime.split(":")[1]);

      const durationInHours =
        endHour - startHour + (endMinute - startMinute) / 60;

      const pricePerHour = turfDetail.price[selectedCourtType];

      const totalPrice = durationInHours * parseFloat(pricePerHour);
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

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setSelectedDate(currentDate);
  }, []);

  const handleStartTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setErrorMessage("");
    setSelectedStartTime(e.target.value);
    setSelectedEndTime("");
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndTime(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleCourtTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourtType(e.target.value);
  };

  const handleBooking = async () => {
    try {
      if (
        !selectedStartTime ||
        !selectedEndTime ||
        !selectedDate ||
        !totalPrice
      ) {
        setErrorMessage("Please select start time,end time and date.");
        setShowErrorModal(true);
        return;
      }

      if (!onlineChecked && !payWithWallet) {
        setErrorMessage("Please select a payment method.");
        setShowErrorModal(true);
        return;
      }

      if (turfDetail) {
        let paymentMethod;
        if (onlineChecked) {
          paymentMethod = "online";
        } else if (payWithWallet) {
          paymentMethod = "wallet";
        }

        if (onlineChecked) {
          const stripeResponse = await axiosUserInstance.post(
            "/stripepayment",
            {
              totalPrice: totalPrice,
              turfDetail: turfDetail,
              ownerId: turfDetail.turfOwner,
              selectedDate: selectedDate,
              selectedStartTime: selectedStartTime,
              selectedEndTime: selectedEndTime,
              paymentMethod: paymentMethod,
            }
          );
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

        if (payWithWallet) {
          const response = await axiosUserInstance.post("/paywithwallet", {
            totalPrice: totalPrice,
            turfDetail: turfDetail,
            selectedDate: selectedDate,
            selectedStartTime: selectedStartTime,
            ownerId: turfDetail.turfOwner,
            selectedEndTime: selectedEndTime,
            paymentMethod: paymentMethod,
          });
          if (
            response.status === 200 &&
            response.data.message === "Booking successful"
          ) {
            setErrorMessage("Payment with wallet was successful!");
            setShowSuccessModal(true);
            setTimeout(() => {
              navigate("/booking");
            }, 3000);
            console.log(response);
          }
        }
      }
    } catch (error: Error) {
      console.error("Error occurred while handling booking:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
        setShowErrorModal(true);
      } else {
        setErrorMessage("Failed to process booking. Please try again later.");
        setShowErrorModal(true);
      }
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
        setShowErrorModal(true);
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
      <div className="mt-10 ml-4 md:ml-10">
        <h3 className="font-sans font-medium text-xl ">Book Your Slot</h3>
      </div>
      {turfDetail && (
        <div className="mt-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mx-4 md:mx-10 my-4 md:my-0 border-double border-2 outline-black rounded-sm">
            <div className="p-4">
              <div className="mt-4">
                <label
                  htmlFor="courtType"
                  className="block text-sm font-semibold mb-2"
                >
                  Select Court Type
                </label>
                <select
                  id="courtType"
                  name="courtType"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={handleCourtTypeChange}
                  value={selectedCourtType}
                >
                  <option value="">Select a court type</option>
                  {Object.keys(turfDetail.price).map((courtType, index) => (
                    <option key={index} value={courtType}>
                      {courtType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                    disabled={!selectedCourtType}
                  >
                    <option value="">Select a start time</option>
                    {generateTimeSlots().map((timeSlot, index) => (
                      <option key={index} value={timeSlot}>
                        {timeSlot}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
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
                  min={selectedDate}
                />
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2 mt-20 text-green-950">
                  Price Details
                </h2>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">
                        Court Type
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Price (per hour)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(turfDetail.price).map(
                      ([courtType, price], index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">
                            {courtType}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {price}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mx-4 md:mx-10 my-4 md:my-0 flex justify-center items-center">
            <div className="border-double border-2 outline-black rounded-sm p-4">
              <p className="text-lg font-semibold mb-2">Checkout Details</p>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} /> Selected Date:{" "}
                {selectedDate ? selectedDate : "Not Selected"}
              </p>
              <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} />  Selected Court Type:{" "}
                {selectedCourtType ? selectedCourtType : "Not Selected"}
              </p>
              <p>
                <FontAwesomeIcon icon={faMoneyBillAlt} /> Total Price:{" "}
                {totalPrice}
              </p>
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
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-600"
                    checked={payWithWallet}
                    onChange={handleWalletCheckboxChange}
                  />
                  <span className="ml-2 text-sm">Pay With Wallet</span>
                </label>
              </div>
              <button
                type="submit"
                onClick={handleBooking}
                disabled={!slotsAvailable}
                className={`mt-4 w-full bg-green-500 text-white font-semibold py-3 rounded-md focus:outline-none ${
                  !slotsAvailable
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-600 focus:bg-green-600"
                }`}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
      {showErrorModal && (
        <ErrorModal
          errorMessage={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          show={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          message="Payment with wallet was successful!"
        />
      )}
      <UserFooter />
    </div>
  );
}

export default Checkout;
