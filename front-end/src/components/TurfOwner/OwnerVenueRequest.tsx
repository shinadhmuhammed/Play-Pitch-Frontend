import { useEffect, useState } from "react";
import { axiosOwnerInstance } from "../../utils/axios/axios";

function OwnerVenueRequest() {
  const [turfsWithBookings, setTurfsWithBookings] = useState<string[]>([]);

  useEffect(() => {
    const fetchTurfsWithBookings = async () => {
      try {
        const response = await axiosOwnerInstance.get("/owner/getownerturf");
        const ownerTurfsData = response.data;

        const turfsWithBookings = await Promise.all(
          ownerTurfsData.map(async (turf: any) => {
            const turfId = turf._id;
            const bookingsResponse = await axiosOwnerInstance.get(
              `/owner/getbookingsforowner/${turfId}`
            );
            const bookings = bookingsResponse.data;
            console.log(bookings);
            if (bookings.length > 0) {
              return { ...turf, bookings: bookings };
            }
            return null;
          })
        );
        const filteredTurfsWithBookings = turfsWithBookings.filter(
          (turf) => turf !== null
        );
        setTurfsWithBookings(filteredTurfsWithBookings);
      } catch (error) {
        console.error("Error fetching turfs with bookings:", error);
      }
    };

    fetchTurfsWithBookings();
  }, []);



  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-600">
        My Turfs with Bookings
      </h1>
      <ul className="border overflow-hidden rounded-md">
        {turfsWithBookings.map((turf: any) => (
          <li
            key={turf._id}
            className="border-b border-gray-300 py-4 px-4 sm:px-6 relative overflow-hidden"
          >
            <h2 className="text-xl font-bold mb-2 flex justify-center text-green-600">
              {turf.turfName}
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <p className="mb-2">
                  <span className="font-semibold">Address:</span> {turf.address},{" "}
                  {turf.city}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">About Venue:</span>{" "}
                  {turf.aboutVenue}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Opening Time:</span>{" "}
                  {turf.openingTime}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Closing Time:</span>{" "}
                  {turf.closingTime}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Facilities:</span>{" "}
                  {turf.facilities}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Price:</span> {turf.price}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Court Type:</span>{" "}
                  {turf.courtType}
                </p>
              </div>
              <div className="w-full sm:w-1/2 sm:ml-4">
                <div className="flex flex-wrap gap-4">
                  {turf.images.map((image: string, index: number) => (
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
              <p className="mb-2 font-semibold flex justify-center text-green-600">
                Bookings:
              </p>
              <ul className="space-y-2">
                {turf.bookings.map((booking: any) => (
                  <li
                    key={booking._id}
                    className="border-t border-gray-300 pt-2 mt-2 relative"
                  >
                    <div className="flex justify-center">
                      <p className="mb-1">
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <p className="mb-1">
                        <span className="font-semibold">
                          Selected Slot:
                        </span>{" "}
                        {booking.selectedSlot}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <p className="mb-1">
                       <span className="font-semibold">
                          Payment Method:
                        </span>{" "}
                        {booking.paymentMethod}
                      </p>
                    </div>
                    
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
                      }

export default OwnerVenueRequest;
