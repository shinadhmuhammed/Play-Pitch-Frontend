import React from "react";
import Swal from "sweetalert2";
import { axiosOwnerInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

interface Turf {
  _id: string;
  turfName: string;
  address: string;
  city: string;
  aboutVenue: string;
  facilities: string;
  openingTime: string;
  closingTime: string;
  price: number;
  images: string[];
  turfOwner: string;
  isActive: boolean;
  isDeclined: boolean;
  courtType: string;
}

function Turf() {
  const [turfs, setTurfs] = React.useState<Turf[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axiosOwnerInstance.get("/owner/getownerturf");
        console.log(response);
        setTurfs(response.data);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };
    fetchTurfs();
  }, []);

  const handleEditClick = (turfId: string) => {
    console.log("Edit clicked for turf with ID:", turfId);
    navigate(`/owner/editturf/${turfId}`);
  };

  const handleDeleteClick = async (turfId: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this turf?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosOwnerInstance.delete(`/owner/deleteturf/${turfId}`);
          setTurfs((prevTurfs) =>
            prevTurfs.filter((turf) => turf._id !== turfId)
          );

          Swal.fire("Deleted!", "Turf has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting turf:", error);
          Swal.fire("Error!", "Failed to delete turf.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif text-gray-800">
          Turf Details
        </h1>
        <ul className="space-y-8">
          {turfs.map((turf) => (
            <li
              key={turf._id}
              className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-grow pr-4">
                  <h2 className="text-2xl font-semibold mb-4 text-green-600">
                    {turf.turfName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <p><span className="font-semibold text-gray-700">Address:</span> {turf.address}, {turf.city}</p>
                    <p><span className="font-semibold text-gray-700">Court Type:</span> {turf.courtType}</p>
                    <p><span className="font-semibold text-gray-700">Opening Time:</span> {turf.openingTime}</p>
                    <p><span className="font-semibold text-gray-700">Closing Time:</span> {turf.closingTime}</p>
                  </div>
                  <p className="mb-4"><span className="font-semibold text-gray-700">About Venue:</span> {turf.aboutVenue}</p>
                  <p className="mb-4"><span className="font-semibold text-gray-700">Facilities:</span> {turf.facilities}</p>
                  <div className="mb-4">
                    <span className="font-semibold text-gray-700">Prices:</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.entries(turf.price).map(([courtType, price]) => (
                        <p key={courtType} className="bg-gray-100 p-2 rounded">
                          <span className="font-medium">{courtType}:</span> ₹{price}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
                  <div className="flex flex-wrap justify-center md:justify-end mb-4">
                    {turf.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Turf ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md m-1 border-2 border-gray-200"
                      />
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                      onClick={() => handleEditClick(turf._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
                      onClick={() => handleDeleteClick(turf._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Turf;
