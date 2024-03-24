import { useEffect, useState } from "react";
import { axiosAdminInstance } from "../../utils/axios/axios";
import NavAdmin from "./NavAdmin";

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

  return (
    <div>
      <NavAdmin />
      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Address</th>
            <th className="border p-3">City</th>
            <th className="border p-3">Facilities</th>
            <th className="border p-3">Opening Time</th>
            <th className="border p-3">Closing Time</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {turfs.map((turf) => (
            <tr key={turf._id}>
              <td className="border p-3">{turf.turfOwnerEmail}</td>
              <td className="border p-3">{turf.turfName}</td>
              <td className="border p-3">{turf.address}</td>
              <td className="border p-3">{turf.city}</td>
              <td className="border p-3">{turf.facilities}</td>
              <td className="border p-3">{turf.openingTime}</td>
              <td className="border p-3">{turf.closingTime}</td>
              <td className="border p-3">{turf.price}</td>
              <td className="border p-3">
                {!turf.isActive && !turf.isDeclined && (
                  <>
                    <button
                      onClick={() => handleAccept(turf._id, turf.turfOwnerEmail)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 mr-1"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(turf._id, turf.turfOwnerEmail)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2"
                    >
                      Decline
                    </button>
                  </>
                )}
                {turf.isActive && (
                  <span className="text-green-600 font-bold">Accepted</span>
                )}
                {turf.isDeclined && (
                  <span className="text-red-600 font-bold">Declined</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VenueRequest;
