import { useEffect, useState } from "react";
import { axiosAdminInstance } from "../../utils/axios/axios";

interface Turf {
  isDeclined: boolean;
  isActive: boolean;
  _id: string;
  turfName: string;
  address: string;
  city: string;
  aboutVenue: string;
  facilities: string;
  openingTime: string;
  closingTime: string;
  price: number;
  image: string;
  turfOwnerEmail: string;
}

function VenueRequest() {
  const [turfs, setTurfs] = useState<Turf[]>([]);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axiosAdminInstance.get("/admin/venuerequest");
        setTurfs(response.data);
        console.log(response);
      } catch (error) {
        console.log("Error fetching turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const handleAccept = async (turfId: string, turfOwnerEmail: string) => {
    try {
      await axiosAdminInstance.post("/admin/venueaccept", {
        turfId,
        turfOwnerEmail,
      });
      setTurfs((prevTurfs) =>
        prevTurfs.map((turf) => {
          if (turf._id === turfId) {
            return { ...turf, isActive: true, isDeclined: false };
          }
          return turf;
        })
      );
      console.log("Turf accepted:", turfId);
    } catch (error) {
      console.log("Error accepting turf:", error);
    }
  };

  const handleDecline = async (turfId: string, turfOwnerEmail: string) => {
    try {
      await axiosAdminInstance.post("admin/venuedecline", {
        turfId,
        turfOwnerEmail,
      });
      setTurfs((prevTurfs) =>
        prevTurfs.map((turf) => {
          if (turf._id === turfId) {
            return { ...turf, isActive: false, isDeclined: true };
          }
          return turf;
        })
      );
      console.log("Turf declined:", turfId);
    } catch (error) {
      console.log("Error declining turf:", error);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
  };

  return (
    <div>
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-white text-lg font-semibold">
                  Dashboard
                </span>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </a>
                  <a
                    href="/venue-request"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Venue Requests
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Venue
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {turfs.map((turf) => (
        <div key={turf._id} className="border p-4 mb-4">
          <h2>{turf.turfName}</h2>
          <p>{turf.address}</p>
          <p>{turf.city}</p>
          <p>{turf.aboutVenue}</p>
          <p>{turf.facilities}</p>
          <p>
            {turf.openingTime} - {turf.closingTime}
          </p>
          <p>Price: {turf.price}</p>
          <img src={turf.image} alt={turf.turfName} className="w-48 h-48" />
          <div className="mt-4">
            {turf.isActive ? (
              <span className="text-green-600 font-bold">Accepted</span>
            ) : null}

            {turf.isDeclined ? (
              <span className="text-red-600 font-bold">Declined</span>
            ) : null}

            {!turf.isActive && !turf.isDeclined && (
              <div>
                <button
                  onClick={() => handleAccept(turf._id, turf.turfOwnerEmail)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(turf._id, turf.turfOwnerEmail)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VenueRequest;
