import React, { useEffect, useState } from "react";
import { axiosAdminInstance } from "../../utils/axios/axios";
import NavAdmin from "./NavAdmin";
import { Link } from "react-router-dom";

interface Turf {
  contactNumber: number;
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
        console.log(response.data)
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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <label htmlFor="filter" className="block text-gray-700 font-semibold mb-2">
                  Filter by Price Range:
                </label>
                <select
                  id="filter"
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="800-1000">800-1000</option>
                  <option value="1000-1200">1000-1200</option>
                </select>
              </div>
              <div>
                <label htmlFor="search" className="block text-gray-700 font-semibold mb-2">
                  Search by Turf Name:
                </label>
                <input
                  type="text"
                  id="search"
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Enter turf name..."
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Email", "Contact Number", "Turf Name", "Address", "Actions", "Details"].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTurfs.map(turf => (
                    <tr key={turf._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{turf.turfOwnerEmail}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{turf.contactNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{turf.turfName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{turf.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {!turf.isActive && !turf.isDeclined ? (
                          <div className="space-x-2">
                            <button
                              onClick={() => handleAccept(turf._id, turf.turfOwnerEmail)}
                              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleDecline(turf._id, turf.turfOwnerEmail)}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            >
                              Decline
                            </button>
                          </div>
                        ) : turf.isActive ? (
                          <span className="text-green-600 font-bold">Accepted</span>
                        ) : (
                          <span className="text-red-600 font-bold">Declined</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/venue-details/${turf._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {Array.from({ length: Math.ceil(filteredTurfs.length / itemsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                  currentPage === i + 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default VenueRequest;
