import React, { useEffect, useState } from "react";
import { axiosAdminInstance } from "../../utils/axios/axios";
import NavAdmin from "./NavAdmin";
import { Link } from "react-router-dom";

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
  courtType: string;
}

function VenueRequest() {
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filterPriceRange, setFilterPriceRange] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredTurfs = turfs.filter(turf => {
    if (filterPriceRange) {
      if (filterPriceRange === "800-1000") {
        return turf.price >= 800 && turf.price <= 1000;
      } else if (filterPriceRange === "1000-1200") {
        return turf.price >= 1000 && turf.price <= 1200;
      }
    }
    return true;
  }).filter(turf => {
    return turf.turfName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTurfs = filteredTurfs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterPriceRange(e.target.value !== "" ? e.target.value : null);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAccept = async (turfId: string, turfOwnerEmail: string) => {
    try {
      await axiosAdminInstance.post("/admin/venueaccept", {
        turfId,
        turfOwnerEmail,
      });
      setTurfs(prevTurfs =>
        prevTurfs.map(turf => {
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
      setTurfs(prevTurfs =>
        prevTurfs.map(turf => {
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
    <div className="min-h-screen bg-gray-100">
      <NavAdmin />
      <div className="overflow-x-auto">
        <div className="mb-4">
          <label htmlFor="filter" className="mr-2 font-semibold">
            Filter by Price Range:
          </label>
          <select
            id="filter"
            className="p-2 border border-gray-300 rounded"
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="800-1000">800-1000</option>
            <option value="1000-1200">1000-1200</option>
          </select>
      
    
          <label htmlFor="search" className="mr-2 font-semibold p-10 ">
            Search by Turf Name:
          </label>
          <input
            type="text"
            id="search"
            className="p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
            </div>
  
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTurfs.map(turf => (
              <tr key={turf._id}>
                <td className="border p-3">{turf.turfOwnerEmail}</td>
                <td className="border p-3">{turf.turfName}</td>
                <td className="border p-3">{turf.address}</td>
                <td className="border p-3 space-x-2">
                  {!turf.isActive && !turf.isDeclined && (
                    <>
                      <button
                        onClick={() => handleAccept(turf._id, turf.turfOwnerEmail)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 mr-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(turf._id, turf.turfOwnerEmail)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
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
                <td className="border p-3">
                  <Link
                    to={`/admin/venue-details/${turf._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-32">
        <nav>
          <ul className="flex items-center">
            {Array.from({ length: Math.ceil(filteredTurfs.length / itemsPerPage) }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                    currentPage === i + 1 ? 'bg-blue-600' : ''
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default VenueRequest;
