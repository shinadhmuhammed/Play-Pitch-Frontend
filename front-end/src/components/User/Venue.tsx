/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance, axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrosshairs,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";
import StarRating from "./StarRating";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
  averageRating: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

function Venue() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [nearestTurf, setNearestTurf] = useState<any>(null);
  const [searchTurf, setSearchTurf] = useState<any>("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [turf, setTurf] = useState<Turf[]>([]);
  const [selectedRatingRange, setSelectedRatingRange] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [averageRatings, setAverageRatings] = useState<{
    [key: string]: number;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [turfsPerPage] = useState(3);


  const navigate = useNavigate();

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log(suggestion);
    setSearchTurf(suggestion);
    setIsInputFocused(false);
  };

  const handleSearchturfInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTurf(event.target.value);
  };

  const handleSearch = async () => {
    if (userLocation) {
      try {
        const response = await axiosUserInstance.post("/nearestTurf", {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          query: searchQuery,
        });
        console.log(response.data.nearestTurf);
        setNearestTurf(response.data.nearestTurf);
      } catch (error) {
        console.error("Error finding nearest turf:", error);
      }
    } else {
      toast.error("User location not available.");
    }
  };

  const handleTurfSearchSuggestions = async () => {
    try {
      const response = await axiosUserInstance.post(
        "/getTurfSearchSuggestions",
        {
          query: searchTurf,
        }
      );
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching turf search suggestions:", error);
    }
  };

  useEffect(() => {
    handleTurfSearchSuggestions();
  }, [searchTurf]);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCPqPnBZ33jk1vGyNiCHToX9W9edkqlmls`
          );
          const addressComponents = response.data.results[0].address_components;
          let city = "";
          for (const component of addressComponents) {
            if (component.types.includes("sublocality_level_1")) {
              // neighborhood = component.long_name;
            } else if (component.types.includes("locality")) {
              city = component.long_name;
            }
          }
          setSearchQuery(`${city}`);
          setUserLocation({
            latitude: latitude,
            longitude: longitude,
          });
        } catch (error) {
          console.error("Error getting user's location:", error);
        }
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  };

 



  useEffect(() => {
    const fetchTurfData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
          const response = await axiosInstance.get("/getturf", {
          });
          console.log(response.data)
          setTurf(response.data);
          fetchAverageRatings(response.data);
        
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTurfData();
  }, [navigate]);

  const fetchAverageRatings = async (turfData: Turf[]) => {
    try {
      const ratings: { [key: string]: number } = {};
      await Promise.all(
        turfData.map(async (turf) => {
          const response = await axiosUserInstance.post(
            "/getTurfAverageRating",
            {
              turfId: turf._id,
            }
          );
          console.log(response.data);
          ratings[turf._id] = response.data.averageRating;
        })
      );
      setAverageRatings(ratings);
    } catch (error) {
      console.error("Error fetching average ratings:", error);
    }
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRatingRange(event.target.value);
  };

  const filteredTurf = selectedRatingRange
    ? turf.filter((turfItem) => {
        const averageRating = averageRatings && averageRatings[turfItem._id];
        if (averageRating) {
          const [min, max] = selectedRatingRange.split("-");
          return (
            averageRating >= parseFloat(min) && averageRating <= parseFloat(max)
          );
        }
        return false;
      })
    : turf;

  const indexOfLastTurf = currentPage * turfsPerPage;
  const indexOfFirstTurf = indexOfLastTurf - turfsPerPage;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentTurfs = turf.slice(indexOfFirstTurf, indexOfLastTurf);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTurfSearch = async () => {
    try {
      const response = await axiosUserInstance.post("/searchTurfName", {
        query: searchTurf,
      });
      setTurf(response.data);
    } catch (error) {
      console.error("Error searching turf names:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div
        className="relative"
        style={{
          backgroundImage: `url('/images/bg3.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <UserNav /> */}
        <nav className="flex justify-between items-center mt-7 p-10">
          <h1 className="font-extrabold text-xl">Book Your Venues</h1>
          <div className="flex items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search turf name..."
                value={searchTurf}
                onChange={handleSearchturfInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              {isInputFocused && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleTurfSearch}
              type="button"
              className="mr-10 p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            <div className="relative mr-6">
              <input
                type="text"
                placeholder="Get Nearest Turfs"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 mr-3"
              />
              <button
                onClick={handleSearch}
                className="absolute right-5 top-2 text-gray-500 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCrosshairs} />
              </button>
            </div>
            <select
              value={selectedRatingRange || ""}
              onChange={handleRatingChange}
              className="border border-gray-400 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Filter by Rating</option>
              <option value="3-5">3 - 5</option>
              <option value="1-3">1 - 3</option>
            </select>
          </div>
        </nav>

        {turf.length === 0 && (
          <div className=" text-gray-600 flex justify-center">
            <h1 className="font-bold  ">No Turf Found</h1>

            <img
              src="/images/no turf.svg"
              alt="Image of Ronaldo"
              className="mt-10"
            ></img>
          </div>
        )}

        {nearestTurf ? (
          <div>
            <Link to={`/turf/${nearestTurf._id}`}>
              <div className="bg-white shadow-md rounded-md p-4 g">
                {nearestTurf.images.length > 0 && (
                  <div className="relative group">
                    <img
                      src={nearestTurf.images[0]}
                      alt={nearestTurf.turfName}
                      className="w-full h-52 object-cover mb-4 rounded-md hue-rotate-15 transition-transform duration-300 transform group-hover:scale-105"
                    />
                  </div>
                )}
                <h2 className="text-lg font-semibold mb-2">
                  {nearestTurf.turfName}
                </h2>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                  <span>
                    {nearestTurf.address}, {nearestTurf.city}
                  </span>
                </div>
                {averageRatings && averageRatings[nearestTurf._id] && (
                  <StarRating
                    totalStars={5}
                    initialRating={averageRatings[nearestTurf._id]}
                  />
                )}
              </div>
            </Link>
          </div>
        ) : (
          <>
            {turf.length === 0 && (
              <div className="text-center text-gray-600"></div>
            )}
            {turf.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-6 ">
                {filteredTurf.map((turfItem) => (
                  <Link key={turfItem._id} to={`/turf/${turfItem._id}`}>
                    <div className="bg-white shadow-md rounded-md p-4 g">
                      {turfItem.images.length > 0 && (
                        <div className="relative group">
                          <img
                            src={turfItem.images[0]}
                            alt={turfItem.turfName}
                            className="w-full h-52 object-cover mb-4 rounded-md hue-rotate-15 transition-transform duration-300 transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h2 className="text-lg font-semibold mb-2">
                        {turfItem.turfName}
                      </h2>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="mr-1"
                        />
                        <span>
                          {turfItem.address}, {turfItem.city}
                        </span>
                      </div>
                      {averageRatings && averageRatings[turfItem._id] && (
                        <StarRating
                          totalStars={5}
                          initialRating={averageRatings[turfItem._id]}
                        />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(turf.length / turfsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-white text-white-500"
                } font-bold px-3 py-2 rounded-md focus:outline-none`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>

        <UserFooter />
      </div>
    </>
  );
}
export default Venue;
