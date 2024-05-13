import { useEffect, useState } from "react";
import { axiosOwnerInstance } from "../../utils/axios/axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

interface Turf {
  _id: string;
  turfName: string;
  openingTime: string;
  closingTime: string;
  courtType: string;
  images: string[];
  bookings: Booking[];
}

interface Booking {
  _id: string;
  date: string;
  selectedSlot: string;
  paymentMethod: string;
  totalPrice: number;
  bookingStatus: string;
}

function OwnerVenueRequest() {
  const [turfsWithBookings, setTurfsWithBookings] = useState<Turf[]>([]);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [selectedTurfBookings, setSelectedTurfBookings] = useState<Booking[]>(
    []
  );
  const [selectedTurfId, setSelectedTurfId] = useState<string>("");

  useEffect(() => {
    const fetchTurfsWithBookings = async () => {
      try {
        const response = await axiosOwnerInstance.get("/owner/getownerturf");
        const ownerTurfsData = response.data;

        const turfsWithBookings = await Promise.all(
          ownerTurfsData.map(async (turf: Turf) => {
            const turfId = turf._id;
            const bookingsResponse = await axiosOwnerInstance.get(
              `/owner/getbookingsforowner/${turfId}`
            );
            const bookings: Booking[] = bookingsResponse.data;
            if (bookings.length > 0) {
              return { ...turf, bookings: bookings };
            }
            return null;
          })
        );
        const filteredTurfsWithBookings = turfsWithBookings.filter(
          (turf) => turf !== null
        ) as Turf[];
        setTurfsWithBookings(filteredTurfsWithBookings);
      } catch (error) {
        console.error("Error fetching turfs with bookings:", error);
      }
    };

    fetchTurfsWithBookings();
  }, []);

  const cancelBooking = async (bookingId: string, turfId: string) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await axiosOwnerInstance.post(
          "/owner/cancelbookings",
          { turfId, bookingId }
        );
        console.log("Booking cancelled:", response.data);
        const updatedTurfsWithBookings = turfsWithBookings.map((turf) => {
          if (turf._id === turfId) {
            const updatedBookings = turf.bookings.map((booking) => {
              if (booking._id === bookingId) {
                return { ...booking, bookingStatus: "cancelled" };
              }
              return booking;
            });
            return { ...turf, bookings: updatedBookings };
          }
          return turf;
        });
        setTurfsWithBookings(updatedTurfsWithBookings);

        Swal.fire({
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error cancelling booking:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while cancelling the booking.",
          icon: "error",
        });
      }
    }
  };

  const openBookingsModal = (turfId: string, turfBookings: Booking[]) => {
    setSelectedTurfId(turfId);
    setSelectedTurfBookings(turfBookings);
    setShowBookingsModal(true);
  };

  const closeBookingsModal = () => {
    setShowBookingsModal(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-600 text-pretty font-sans">
        My Turfs with Bookings
      </h1>
      <ul className="border overflow-hidden rounded-md">
        {turfsWithBookings.map((turf) => (
          <li
            key={turf._id}
            className="border-b border-gray-300 py-4 px-4 sm:px-6 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <p className="mb-2">
                  <span className="font-semibold">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Venue Name:
                  </span>{" "}
                  {turf.turfName}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">
                    <FontAwesomeIcon icon={faClock} /> Starting and Ending Time:
                  </span>{" "}
                  {turf.openingTime} - {turf.closingTime}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">
                    <FontAwesomeIcon icon={faBuilding} /> Court Type:
                  </span>{" "}
                  {turf.courtType}
                </p>
              </div>
              <div className="w-full sm:w-1/2 sm:ml-4">
                <div className="flex gap-4">
                  {turf.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Turf ${index + 1}`}
                      className="w-48 h-48 object-cover rounded-md shadow-md"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => openBookingsModal(turf._id, turf.bookings)}
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Turf Bookings
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showBookingsModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Turf Bookings
                    </h3>
                    <div className="mt-2">
                      <ul className="divide-y divide-gray-200">
                        {selectedTurfBookings.map((booking) => (
                          <li key={booking._id} className="py-4">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                Date:{" "}
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                             
                            </div>
                            <p className="text-sm font-medium text-gray-500">
                                Slot: {booking.selectedSlot}
                              </p>
                            <p className="text-sm text-gray-500">
                              Payment: {booking.paymentMethod}
                            </p>
                            <p className="text-sm text-gray-500">
                              Total Price: {booking.totalPrice}
                            </p>
                            <p className="text-sm text-gray-500">
                              Booking Status: {booking.bookingStatus}
                            </p>
                            <div className="flex justify-center">
                              {booking.bookingStatus === "confirmed" && (
                                <button
                                  onClick={() => cancelBooking(booking._id, selectedTurfId)}
                                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                                >
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeBookingsModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerVenueRequest;
