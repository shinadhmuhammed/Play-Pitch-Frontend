import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/Redux/slice/userSlices";
import { useNavigate, Link } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import UserNav from "./UserNav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';



interface Turf {
  _id: string;
  turfName: string;
  address: string;
  city: string;
  aboutvenue: string;
  openingTime: string;
  closingTime: string;
  court: string;
  price: number;
  images: string[];
}

function Homepage() {
  const [turf, setTurf] = useState<Turf[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      dispatch(userLogin(userData));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const fetchTurfData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (token) {
          const response = await axiosUserInstance.get("/getturf", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data)
          setTurf(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTurfData();
  }, [navigate]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(event.target.value === "all" ? null : event.target.value);
    setCurrentPage(1);
  };

  const filteredTurf = turf.filter((turf) => {
    const regex = new RegExp(searchQuery, 'i'); 
    return regex.test(turf.turfName) && (selectedPriceRange ? turf.price >= Number(selectedPriceRange.split("-")[0]) && turf.price <= Number(selectedPriceRange.split("-")[1]) : true);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTurf = filteredTurf.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredTurf.length / itemsPerPage);


  const priceRanges = [
    "all",
    "800-1000",
    "1000-1200",
    "1200-1500",
  ];

  return (
    <>
    <div className="relative" style={{ backgroundImage: `url('/images/bg3.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <UserNav />
      <nav className="flex justify-between items-center mt-7 p-10">
        <h1 className="font-extrabold text-xl">Book Your Venues</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a7 7 0 100 14 7 7 0 000-14zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div className="relative mr-4">
            <select
              value={selectedPriceRange || "all"}
              onChange={handlePriceRangeChange}
              className="border border-gray-400 rounded-lg px-1 py-1 focus:outline-none focus:border-blue-500"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <button className="text-gray-600 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.5 5a.5.5 0 01.5-.5h14a.5.5 0 010 1h-14a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>

      {filteredTurf.length === 0 && (
        <div className="text-center text-gray-600">No turf found.</div>
      )}



      {filteredTurf.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-6 ">
          {currentTurf.map((turf) => (
            <Link key={turf._id} to={`/turf/${turf._id}`}>
              <div className="bg-white shadow-md rounded-md p-4 g">
                {turf.images.length > 0 && (
                  <div className="relative group">
                    <img
                      src={turf.images[0]}
                      alt={turf.turfName}
                      className="w-full h-52 object-cover mb-4 rounded-md hue-rotate-15 transition-transform duration-300 transform group-hover:scale-105"
                    />
                  </div>
                )}

                <h2 className="text-lg font-semibold mb-2">{turf.turfName}</h2>
                <div className="flex items-center text-sm text-gray-600 mb-2">
  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
  <span>{turf.address}, {turf.city}</span>
</div>
                {/* <p className="text-sm text-gray-600 mb-2">{turf.court}</p>
                {Object.entries(turf.price).map(([courtType, price]) => (
  <p key={courtType} className="text-sm text-gray-600 mb-2">
    {courtType}: ₹{price}
  </p>
))} */}

              </div>
            </Link>
          ))}
        </div>
      )}

      {filteredTurf.length > 0 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-white text-white-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
   
      <UserFooter />
      
      </div>
     
    </>
  );
}

export default Homepage;
