import { useEffect, useState } from "react";
import { axiosInstance, axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../services/Redux/slice/userSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faMapMarkerAlt,
  faUsers,
  faClock,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";

interface Activity {
  _id: string;
  activityName: string;
  slot: string;
  date: string;
  turfName: string;
  maxPlayers: number;
  address: string;
  participants: string[];
}

function GetActivityLanding() {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(userId)

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/getactivities");
      console.log(response)
      const { userId, activity } = response.data;
      setUserId(userId);
      setActivity(activity);
      dispatch(updateUserId({ userId: userId }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    setLoading(true);
    try {
      const response = await axiosUserInstance.get(`/searchActivity?query=${searchQuery}`);
      const { activity } = response.data;
      setActivity(activity);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function formatDateTime(dateTime: string) {
    const dateObject = new Date(dateTime);
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  }

  return (
    <div className="min-h-screen">
      {loading && <Loader/>}  
      <nav className="flex justify-end items-center bg-gray-100 p-4 shadow-xl">
        <a
          href="/login"
          className="text-green-500 border border-green-500 px-4 py-2 rounded mr-2 shadow-md hover:bg-green-500 hover:text-white"
        >
          Login
        </a>
        <a
          href="/signup"
          className="text-white bg-gray-300 px-4 py-2 rounded shadow-md hover:bg-gray-400 hover:text-black"
        >
          Register
        </a>
      </nav>
    
      <div className="bg-cover bg-center bg-no-repeat">
        <nav className="flex justify-between items-center mt-7 p-5 md:p-10">
          <h1 className="font-bold text-2xl ml-4 md:ml-0 md:text-3xl">Join Games</h1>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSearchButtonClick}
                className="absolute right-3 top-2 text-gray-500"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </nav>
  
        <div className="mx-auto md:ml-16 md:mr-16 lg:ml-32 lg:mr-32 grid gap-6 shadow-lg">
          {activity.map((activity) => (
            <div
              key={activity._id}
              className={`p-6 border border-gray-400`}
            >
              <div className="mb-4">
                <p className="text-sm font-semibold bg-white text-black py-1 px-3 rounded-md inline-block shadow-md opacity-50">
                  {formatDateTime(activity.date)}
                </p>
              </div>
  
              <div className="text-xl font-extrabold">
                <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-violet-800">
                  {activity.activityName}
                </h3>
              </div>
              <p className="text-sm">
                <FontAwesomeIcon icon={faTshirt} className="mr-2" />
                Turf Name: {activity.turfName}
              </p>
              <p className="text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Place: {activity.address}
              </p>
              <p className="text-sm">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Max Players: {activity.maxPlayers}
              </p>
              <p className="text-sm">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Selected Slot: {activity.slot}
              </p>
  
              <p className="text-sm">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Participants:{" "}
                {activity.participants.length > 0
                  ? activity.participants.length
                  : "0"}{" "}
                player joined
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    navigate(`/viewdetails/${activity._id}`);
                  }}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  View Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <UserFooter />
    </div>
  );
}  

export default GetActivityLanding;
