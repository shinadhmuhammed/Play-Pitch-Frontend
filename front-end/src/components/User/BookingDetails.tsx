import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import Swal from "sweetalert2";

interface Booking {
  Time: string | number | Date;
  _id: string;
  userId: string;
  turfId: string;
  date: string;
  selectedSlot: string;
  totalPrice: number;
  paymentMethod: string;
  bookingStatus: string;
  __v: number;
}

interface Turf {
  longitude: number;
  latitude: number;
  _id: string;
  turfName: string;
  aboutVenue: string;
  address: string;
  city: string;
  openingTime: string;
  closingTime: string;
  price: number;
  facilities: string;
  images: string[];
  isActive: boolean;
  isDeclined: boolean;
  turfOwner: string;
  __v: number;
}

function BookingDetails() {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [turfDetails, setTurfDetails] = useState<Turf | null>(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    maxPlayers: "",
    description: "",
    activityName: "",
  });

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosUserInstance.post("/createactivity", {
        formData,
        bookingDetails,
        turfDetails,
        user,
      });
      console.log(response.data);
      setShowModal(false);
      setFormData({
        maxPlayers: "",
        description: "",
        activityName: "",
      });
      Swal.fire("Activity Created", "", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to create activity", "error");
    }
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosUserInstance.get(
          `/getbooking/${location.state.booking._id}`
        );
        console.log(response.data);
        setBookingDetails(response.data.booking);
        setTurfDetails(response.data.turfDetails);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
  }, []);

  const handleCancelBooking = async () => {
    try {
      const response = await axiosUserInstance.post("/cancelbooking", {
        id: bookingDetails?._id,
      });
      console.log(response.data);
      setBookingDetails((prevBookingDetails: Booking | null) => ({
        ...(prevBookingDetails as Booking),
        bookingStatus: "cancelled",
      }));
      Swal.fire("Booking Cancelled", "", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to cancel booking", "error");
    }
  };

  const calculateRefundMessage = () => {
    if (!bookingDetails) return "";

    const cancellationTime = new Date();

    const bookingDate = new Date(bookingDetails.date);
    const startTime = bookingDetails.selectedSlot.split(" - ")[0];

    const bookingDateTime = new Date(
      bookingDate.getFullYear(),
      bookingDate.getMonth(),
      bookingDate.getDate(),
      parseInt(startTime.split(":")[0]),
      parseInt(startTime.split(":")[1])
    );

    const timeDifference =
      bookingDateTime.getTime() - cancellationTime.getTime();

    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursDifference < 1) {
      return "No refund is available for cancellations within 1 hour of play.";
    } else if (hoursDifference >= 10) {
      return "You are eligible for a full refund.";
    } else {
      return "You are eligible for a 50% refund.";
    }
  };

  if (!bookingDetails || !turfDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <a
        href="/booking"
        className="inline-block px-2 py-2 mt-3 bg-blue-800 hover:bg-blue-600 text-white font-semibold border border-blue-500 rounded-lg shadow-md transition duration-300 ease-in-out items-center"
      >
        &larr;
        <span className="ml-2">Back To Bookings</span>
      </a>

      <h1 className="flex justify-center font-bold mt-10">Booking Details</h1>

      <p className="flex justify-center font-semibold mt-3">
        {turfDetails.turfName}
      </p>
      <div className="flex flex-wrap justify-center mt-6">
        {turfDetails.images.map((imageUrl, index) => (
          <div key={index} className="max-w-xs mx-4 my-2">
            <img
              src={imageUrl}
              alt={`Turf Image ${index + 1}`}
              className="w-full h-48 rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 mb-6">
        <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
          <p className="text-lg font-bold mb-2">Booking Details</p>
          <hr className="my-2" />
          <p className="text-gray-700 mb-1">
            Total Price:{" "}
            <span className="text-green-500">${bookingDetails.totalPrice}</span>
          </p>
          <p className="text-gray-700 mb-1">
            Booking Status:{" "}
            <span
              className={`font-semibold ${
                bookingDetails.bookingStatus === "Confirmed"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {bookingDetails.bookingStatus}
            </span>
          </p>
          <p className="text-gray-700 mb-1">
            Booked On: {new Date(bookingDetails.Time).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-1">
            Slot Booked Date:{" "}
            {new Date(bookingDetails.date).toISOString().slice(0, 10)}
          </p>
          <p className="text-gray-700 mb-1">
            Selected Slot: {bookingDetails.selectedSlot}
          </p>

          {bookingDetails?.bookingStatus === "confirmed" && (
            <div>
              <button
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  const refundMessage = calculateRefundMessage();
                  Swal.fire({
                    title: "Are you sure?",
                    text: `You want to cancel this booking? ${refundMessage}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, cancel it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleCancelBooking();
                    }
                  });
                }}
              >
                Cancel Booking
              </button>

              <button
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
              >
                Create Activity
              </button>
            </div>
          )}
        </div>
      </div>

      {bookingDetails.bookingStatus === "confirmed" && (
        <div className="flex justify-center mt-8 mb-8">
          <div className="border-4 border-black ring-4 p-4">
            <p className="text-gray-700 font-semibold">Cancellation Policy:</p>
            <ul className="pl-8 border border-gray-300 rounded-lg p-4">
              <li className="mb-2">
                <span className="font-semibold">
                  Cancel more than 24 hours:
                </span>{" "}
                You can get a full refund.
              </li>
              <li className="mb-2">
                <span className="font-semibold">
                  Cancel within 10 hours of booking date:
                </span>{" "}
                You get only 50% refund.
              </li>
              <li>
                <span className="font-semibold">
                  Cancel with 1 hour remaining:
                </span>{" "}
                You don't get any refund.
              </li>
            </ul>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
          {/* Background overlay */}
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          {/* Modal container */}
          <div className="bg-white rounded-lg p-8 max-w-md relative z-20">
            <h2 className="text-2xl font-bold mb-4">Create Activity</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="maxPlayers"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Max Players:
                </label>
                <input
                  type="number"
                  id="maxPlayers"
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="activityName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Activity Name:
                </label>
                <input
                  type="text"
                  id="activityName"
                  name="activityName"
                  value={formData.activityName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingDetails;
