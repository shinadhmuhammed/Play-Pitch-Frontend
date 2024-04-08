import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userLogin } from "../../services/Redux/slice/userSlices";
import { useNavigate, Link } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import UserNav from "./UserNav";

interface Turf {
  _id: string;
  turfName: string;
  address: string;
  city: string;
  aboutvenue: string;
  facilities: string;
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
          setTurf(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTurfData();
  }, [navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTurf = turf.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(turf.length / itemsPerPage);

  return (
    <>
      <UserNav />
      <nav className="flex justify-between items-center mt-7 p-10">
        <h1 className="font-extrabold text-xl">Book Your Venues</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
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
              <p className="text-sm text-gray-600 mb-2">
                {turf.address}, {turf.city}
              </p>
              <p className="text-sm text-gray-600 mb-2">{turf.court}</p>
              <p className="text-sm text-gray-600 mb-2">Price: ₹{turf.price}</p>
            </div>
          </Link>
        ))}
      </div>

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

      <UserFooter />
    </>
  );
}

export default Homepage;
