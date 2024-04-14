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
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 flex justify-center font-serif">
          Turf Details
        </h1>
        <ul className="space-y-8">
          {turfs.map((turf) => (
            <li
              key={turf._id}
              className="flex items-center justify-between bg-gray-100 p-6 rounded-md shadow-lg"
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                  <span className="font-semibold">Turf Name:</span>{" "}
                  {turf.turfName}
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Address:</span> {turf.address}
                  , {turf.city}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">About Venue:</span>{" "}
                  {turf.aboutVenue}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Facilities:</span>{" "}
                  {turf.facilities}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Opening Time:</span>
                  {turf.openingTime}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Closing Time:</span>{" "}
                  {turf.closingTime}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Court Type:</span>{" "}
                  {turf.courtType}
                </p>
                <div className="mb-2">
                  <span className="font-semibold">Prices:</span>
                  {Object.entries(turf.price).map(([courtType, price]) => (
                    <p key={courtType} className="ml-2">
                      {courtType}: {price}
                    </p>
                  ))}
                </div>
              </div>
              {turf.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Turf ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md ml-2"
                />
              ))}

              <div className="flex flex-col">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none mb-2"
                  onClick={() => handleEditClick(turf._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                  onClick={() => handleDeleteClick(turf._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Turf;
