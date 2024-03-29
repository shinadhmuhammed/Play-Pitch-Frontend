import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserNav from "./UserNav";
import UserFooter from "./UserFooter";

interface TurfDetail {
  courtType: string;
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
  const navigate = useNavigate();
  const [turfDetail, setTurfDetail] = useState<TurfDetail | null>(null);

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

  const handleBookingFront = async () => {
    if (!turfDetail) {
      console.log("Turf details are not available.");
      return;
    }

    navigate("/checkout", { state: { turfDetail } });
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
            </div>

            <div className="w-1/4 mt-5">
            <h1 className="font-bold">Place</h1>
            <h1 className="font-semibold">
              {turfDetail.address}, {turfDetail.city}
            </h1>
            <h1 className="font-bold">Timing</h1>
              <h1 className="font-semibold">
                {turfDetail.openingTime}- {turfDetail.closingTime}
              </h1>
            <h1 className="font-bold">Court Type</h1>
            <h1 className="font-semibold">{turfDetail.courtType}</h1>
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold w-80 h-10 rounded-md shadow-md mt-24 mr-6 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={handleBookingFront}
              >
                Book Now
              </button>

          </div>
         
        </div>

  
              

        
           
          
           
          
        </div>
      )}
      <UserFooter/>
    </div>
  );
}

export default TurfDetailPage;
