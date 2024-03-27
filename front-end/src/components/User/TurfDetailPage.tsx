import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserNav from "./UserNav";

interface TurfDetail {
  _id: string;
  turfName: string;
  address: string;
  city: string;
  aboutVenue: string;
  openingTime: string;
  closingTime: string;
  price: number;
  facilities: string;
  images: string[];
}

function TurfDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [turfDetail, setTurfDetail] = useState<TurfDetail | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");


  useEffect(() => {
    const fetchTurfDetail = async () => {
      try {
        const response = await axiosUserInstance.get(`/getTurf/${id}`);
        setTurfDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTurfDetail();
  }, [id]);

  const generateTimeSlots = () => {
    if (!turfDetail || !turfDetail.openingTime || !turfDetail.closingTime) return [];
  
    const openingHour = parseInt(turfDetail.openingTime.split("")[0]);
    const closingHour = parseInt(turfDetail.closingTime.split(":")[0]);
    const timeSlots = [];
  
    for (let hour = openingHour; hour < closingHour; hour++) {
      timeSlots.push(`${hour}-${hour + 1}`);
    }
  
    console.log("Generated Time Slots:", timeSlots);
  
    return timeSlots;
  };
  
  

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeSlot(e.target.value);
  };



  const handleBooking = () => {
    if (!turfDetail) {
      console.log("Turf details are not available.");
      return;
    }

    if (!selectedTimeSlot) {
      console.log("Please select a time slot.");
      return;
    }

    // Logic for booking the turf with selectedTimeSlot and selectedDuration
    console.log("Booking:", selectedTimeSlot);
  };
  
  return (
<div>
  <UserNav />

  {turfDetail && (
    <div className="mx-8">
      <h1 className="font-bold text-4xl md:text-5xl lg:text-4xl mt-8 font-serif">
        {turfDetail.turfName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mt-6">
        {turfDetail.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className="w-full h-48 object-cover rounded-md shadow-md"
          />
        ))}
      </div>

      <div className="flex">
        <div className="w-3/4">
          <h1 className="font-bold">Timing</h1>
          <h1 className="font-semibold">
            {turfDetail.openingTime}- {turfDetail.closingTime}
          </h1>
        </div>

        <div className="w-1/4">
          <h1 className="font-bold">Place</h1>
          <h1 className="font-semibold">
            {turfDetail.address}, {turfDetail.city}
          </h1>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <div className="w-3/4 pr-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">About Venue</h2>
            <p className="text-gray-700">{turfDetail.aboutVenue}</p>
          </div>

          <div className="mt-6 border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Facilities</h2>
            <ul className="list-disc list-inside">
              {turfDetail.facilities.split(",").map((facility, index) => (
                <li key={index} className="text-gray-700">
                  {facility.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <div className="w-3/4 pr-4">

          <div className="mt-4">
  <label
    htmlFor="timeSlot"
    className="block text-sm font-semibold mb-2"
  >
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
      <option key={index} value={timeSlot}>{timeSlot}</option>
    ))}
  </select>
</div>


            <button
              className="bg-green-500 text-white font-semibold py-2 px-36 rounded-lg shadow-md mt-6"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

                )}

export default TurfDetailPage;
