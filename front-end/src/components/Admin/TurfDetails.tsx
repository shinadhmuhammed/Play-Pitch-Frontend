import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosAdminInstance } from "../../utils/axios/axios";
import React from "react";

interface Turf {
  _id: string;
  turfName: string;
  address: string;
  city: string;
  openingTime: string;
  closingTime: string;
  aboutVenue: string;
  facilities: string;
  price: number;    
  courtType:string;
  images: string[];
}

function TurfDetails() {
  const { turfId } = useParams<{ turfId: string }>();
  const [turf, setTurf] = useState<Turf | null>(null);

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await axiosAdminInstance.get(`/admin/venuerequest/${turfId}`);
        setTurf(response.data);
      } catch (error) {
        console.log("Error fetching turf details:", error);
      }
    };

    fetchTurfDetails();
  }, [turfId]);

  if (!turf) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl font-bold mb-6 text-center font-mono">{turf.turfName}</h1>
  <div className="flex flex-wrap -mx-4">
    <div className="lg:w-1/2 md:w-1/2 px-4 mb-8 md:mb-0">
      <img src={turf.images[0]} alt={turf.turfName} className="w-full rounded-lg mb-4" />
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-bold mb-2">Address:</p>
        <p className="text-gray-800">{turf.address}</p>
        <p className="text-xl font-bold mb-2 mt-4">City:</p>
        <p className="text-gray-800">{turf.city}</p>
        <p className="text-xl font-bold mb-2 mt-4">Opening Time:</p>
        <p className="text-gray-800">{turf.openingTime}</p>
        <p className="text-xl font-bold mb-2 mt-4">Closing Time:</p>
        <p className="text-gray-800">{turf.closingTime}</p>
      </div>
    </div>
    <div className="lg:w-1/2 md:w-1/2 px-4 mb-8 md:mb-0">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-bold mb-2">About Venue:</p>
        <p className="text-gray-800">{turf.aboutVenue}</p>
        <p className="text-xl font-bold mb-2 mt-4">Facilities:</p>
        <p className="text-gray-800">{turf.facilities}</p>
        <p className="text-xl font-bold mb-2 mt-4">Price:</p>
  <ul>
    {Object.entries(turf.price).map(([courtType, price]) => (
      <li key={courtType} className="text-gray-800">
        {courtType}: {price}
      </li>
    ))}
  </ul>
        <p className="text-xl font-bold mb-2 mt-4">Court Type:</p>
        <p className="text-gray-800">{turf.courtType}</p>
      </div>
    </div>
  </div>
  <div className="flex justify-end">
  <a href="/admin/venue-request" className="inline-block">
    <span className="hover:bg-blue-600 hover:text-white hover:border bg-blue-900 hover:border-blue-600 text-black font-bold py-2 px-4 rounded">
      Back to Venue Requests
    </span>
  </a>
</div>

</div>

  );
}

export default TurfDetails;
