import { useEffect, useState } from "react";
import UserNav from "./UserNav";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserFooter from "./UserFooter";
import { useNavigate } from "react-router-dom";

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

function GetActivity() {
  const [activity, setActivity] = useState<Activity[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axiosUserInstance.get("/getactivity");
        console.log(response.data);
        setActivity(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
  }, []);

  // Assuming formatDateTime function formats date manually
  function formatDateTime(dateTime: any) {
    const dateObject = new Date(dateTime);
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  }

  return (
    <div className="">
      <div
        className="relative"
        style={{
          backgroundImage: `url('/images/bg3.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <UserNav />
        <div className="">
          <div className="">
            <nav className="flex justify-between items-center mt-7 p-10  ">
              <h1 className="font-bold font-sans text-2xl ml-10 ">
                Join Games
              </h1>
              <div className="flex items-center">
                <div className="relative mr-4">
                  <input
                    type="text"
                    placeholder="Search"
                    //   value={searchQuery}
                    //   onChange={handleSearchInputChange}
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
              </div>
            </nav>

            <div className="ml-32 mr-32 grid gap-6">
              {activity.map((activity, index) => (
                <div
                  key={activity._id}
                  className={`p-6 ${
                    index % 2 === 0
                      ? "border border-solid "
                      : "border border-solid border-grey-400"
                  } shadow-xl`}
                >
                  <div className="relative group">
                    <div>
                      <div className="mb-4">
                        <p className="text-sm font-semibold bg-white text-black py-1 px-3 rounded-md inline-block shadow-md opacity-50 ">
                          {formatDateTime(activity.date)}
                        </p>
                      </div>

                      <div className="text-2xl font-extrabold  ">
                        <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-violet-800">
                          {activity.activityName}
                        </h3>
                      </div>
                      <p className="text-sm ">Turf Name: {activity.turfName}</p>
                      <p className="text-sm">Turf Name: {activity.address}</p>
                      <p className="text-sm">
                        Max Players: {activity.maxPlayers}
                      </p>
                      <p className="text-sm">Selected Slot: {activity.slot}</p>

                      <p className="text-sm">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <UserFooter />
      </div>
      <div />
    </div>
  );
}

export default GetActivity;
