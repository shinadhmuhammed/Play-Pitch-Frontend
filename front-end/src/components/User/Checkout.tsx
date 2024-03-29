import { useState, ChangeEvent } from "react";
import UserNav from "./UserNav";
import { useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";

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
  console.log(turfDetail);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); 
  const [bookingStatus, setBookingStatus] = useState(""); 
  const [message, setMessage] = useState<string | null>(null);

  const generateTimeSlots = () => {
    if (!turfDetail || !turfDetail.openingTime || !turfDetail.closingTime)
      return [];

    const openingHour = parseInt(turfDetail.openingTime.split("")[0]);
    const closingHour = parseInt(turfDetail.closingTime.split(":")[0]);
    const timeSlots: string[] = [];

    for (let hour = openingHour; hour < closingHour; hour++) {
      timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
    }

    return timeSlots;
  };

  const handleTimeSlotChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };



  const handleBooking = async () => {
    if (!turfDetail) {
      console.log("Turf details are not available.");
      return;
    }

    if (!selectedTimeSlot || !selectedDate) {
      console.log("Please select a time slot and Date.");
      return;
    }

    if (!paymentMethod) {
      console.log("Please select a payment method.");
      return;
    }

    try {
      const response = await axiosUserInstance.post('/handlebooking', {
        turfId: turfDetail._id,
        date: selectedDate,
        selectedSlot: selectedTimeSlot,
        turfDetail: turfDetail,
        paymentMethod: paymentMethod,
      });
      setBookingStatus(response.data.status);
      setMessage(response.data.message);
      console.log('Turf booked successfully');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setMessage('invalid');
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
            <p className="text-xl font-semibold">Price: ${turfDetail.price}</p>
            <div className="mt-4">
              <label htmlFor="timeSlot" className="block text-sm font-semibold mb-2">
                Select Time Slot
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleTimeSlotChange}
              >
                <option value="">Select a time slot</option>
                {generateTimeSlots().map((timeSlot, index) => (
                  <option key={index} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="mt-4">
              <label htmlFor="date" className="block text-sm font-semibold mb-2">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleDateChange}
              />
            </div>
  
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">Payment Method:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cashPayment"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => handlePaymentMethodChange("cash")}
                  className="mr-2"
                />
                <label htmlFor="cashPayment" className="mr-4">Cash</label>
                <input
                  type="radio"
                  id="onlinePayment"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => handlePaymentMethodChange("online")}
                  className="mr-2"
                />
                <label htmlFor="onlinePayment">Online</label>
              </div>
            </div>
  
            <button
              onClick={handleBooking}
              className="mt-8 w-full bg-green-500 text-white font-semibold py-3 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Book
            </button>
  
            {message && (
              <div className={`block text-sm font-semibold mb-2 ${bookingStatus === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}  

export default Checkout;
