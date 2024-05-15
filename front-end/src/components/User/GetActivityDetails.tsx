

import { useNavigate, useParams } from "react-router-dom";
import UserNav from "./UserNav";
import { useEffect, useState } from "react";
import { axiosUserInstance } from "../../utils/axios/axios";
import {
  faUsers,
  faInfoCircle,
  faCalendarAlt,
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getActivityId, requestedUserId } from "../../API/UserApi";
import { useSelector } from "react-redux";
import { RootState } from "../../services/Redux/Store/store";
import Swal from "sweetalert2";

interface Game {
  _id: string;
  userName: string;
  activityName: string;
  date: string;
  slot: string;
  maxPlayers: string;
  description: string;
  turfId: string;
  userId: string;
  joinRequests: { user: string; status: string }[];
}

interface User {
  email: string;
  isBlocked: boolean;
  password: string;
  phone: string;
  profilePhotoUrl: string;
  username: string;
  wallet: number;
  __v: number;
  _id: string;
}

interface UserData {
  username: string;
  phone: number;
}

interface RequestData {
  joinRequests: {
    _id: string;
    phone: string;
    username: string;
    user: string;
    status: string;
  }[];
}

function GetActivityDetails() {
  const { id } = useParams();

  const userId = useSelector((state: RootState) => state.user.userId);
  const [activity, setActivity] = useState<Game | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [request, setRequest] = useState<RequestData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<string | null>(null);

  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  console.log(status)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosUserInstance.get("/userdetails");
        const userData = response.data;

        console.log(userData);

        setUserData(userData);
        await new Promise((res) =>
          setTimeout(() => {
            res;
          }, 1000)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const addedUserId = async () => {
      try {
        const response = await requestedUserId({ activity });
        setAddedUsers(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    addedUserId();
  }, [activity]);

  useEffect(() => {
    if (!id) return;
    const fetchActivity = async () => {
      try {
        const activityData = await getActivityId(id);
        if (activityData.joinRequests) {
          const userRequest = activityData.joinRequests.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (request: any) => request.user === userId
          );
          setUserStatus(userRequest ? userRequest.status : null);
        }

        setActivity(activityData);
        setIsOwner(activityData.userId === userId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
  }, [id, userId]);

  async function handleRequest() {
    if (!id) return;
    setIsRequesting(true);
    try {
      if (!userData) {
        throw new Error("User data is missing");
      }
      const { username, phone } = userData;
      const response = await axiosUserInstance.post(`/activityrequest/${id}`, {
        username,
        phone,
      });

      console.log("Request sent successfully");
      console.log(response);
      setStatus("pending");
      Swal.fire({
        icon: "success",
        title: "Request sent successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      const updatedActivityData = await getActivityId(id);
      setActivity(updatedActivityData);
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setIsRequesting(false);
    }
  }

  function formatDateTime(dateTime: string) {
    const dateObject = new Date(dateTime);
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  }

  const fetchRequests = async () => {
    try {
      if (activity) {
        const response = await axiosUserInstance.get("/getrequest");
        const requestData: RequestData = response.data;
        setRequest(requestData);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (joinRequestId: string) => {
    try {
      await axiosUserInstance.put(
        `/acceptJoinRequest/${activity?._id}/${joinRequestId}`
      );
      const response = await axiosUserInstance.get("/getrequest");
      setRequest(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (joinRequestId: string) => {
    try {
      await axiosUserInstance.put(
        `/declineJoinRequest/${activity?._id}/${joinRequestId}`
      );
      const response = await axiosUserInstance.get("/getrequest");
      setRequest(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChat = () => {
    navigate(`/chat?activityId=${id}`);
  };

  return (
    <div>
      <UserNav />
      <div className="ml-5 md:ml-20 mr-5 md:mr-20 mt-5 md:mt-20 border">
        <div className="flex flex-col md:flex-row">
          <img
            className="ml-5 md:ml-10 mt-5 md:mt-10 h-44 w-40 object-center"
            src="/images/profilepin.jpg"
            alt="profile-pic"
          />
          <div className="ml-5 md:ml-10 mt-5 md:mt-10">
            {activity ? (
              <div>
                <h1>
                  <span className="font-semibold">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    Activity Name:
                  </span>{" "}
                  {activity.activityName}
                </h1>
                <h1>
                  <span className="font-semibold">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Hosted User Name:
                  </span>{" "}
                  {activity.userName}
                </h1>
                <h1>
                  <span className="font-semibold">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    Date:
                  </span>{" "}
                  {formatDateTime(activity.date)}
                </h1>
                <h1>
                  <span className="font-semibold">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    Selected Slot:
                  </span>{" "}
                  {activity.slot}
                </h1>
              </div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
        <div className="flex justify-end mr-32 ">
          {(userStatus === "accepted" || isOwner) && (
            <button
              className="bg-green-500  hover:bg-green-700 px-2  text-white font-bold py-2 rounded mb-4"
              onClick={handleChat}
            >
              Chat
            </button>
          )}
        </div>

        {activity &&
        activity.joinRequests &&
        activity.joinRequests.some(
          (request: { user: string }) => request.user === userId
        ) ? (
          <div className="flex justify-end mr-20 mb-10 space-x-4">
            {activity.joinRequests.map(
              (request: { user: string; status: string }, index: number) => (
                <div key={index} className=" rounded-md p-2 ">
                  {request.user === userId && (
                    <p className="text-gray-900 bg-gray-400 ml-44 p-3  rounded opacity-80">
                      Status: {request.status}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex justify-end mr-5 md:mr-10 mb-5 md:mb-10">
            {isOwner ? (
              <button
                onClick={fetchRequests}
                className="mr-5 md:mr-10 py-2.5 px-5 me-2 text-sm font-medium text-white focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-green-700 dark:bg-green-800 dark:text-green-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                See requests
              </button>
            ) : (
              <button
                onClick={handleRequest}
                disabled={isRequesting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isRequesting ? "Requesting..." : "Request"}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="border-x-4 border-y-2 py-5 ml-5 md:ml-20 mr-5 md:mr-20">
        <h1 className="font-sans">
          {" "}
          <FontAwesomeIcon icon={faInfoCircle} /> Description/Rules
        </h1>
        <h1 className="mt-5 ml-5">-- {activity?.description}</h1>
      </div>

      <div className="p-5 md:p-14 ml-5">
        <h1>
          {" "}
          <FontAwesomeIcon icon={faUsers} /> joined Players ({addedUsers.length}{" "}
          /{activity?.maxPlayers})
        </h1>
        <div className="flex flex-wrap">
          {addedUsers &&
            addedUsers.map((user) => (
              <div key={user._id} className="mr-2 md:mr-4 mt-2">
                <p className="font-medium">{user.username}</p>
              </div>
            ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-3xl font-semibold">Requests</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>

              <div className="relative p-5 md:p-10 flex-auto">
                {request &&
                  request.joinRequests.map((requestItem, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold">Request {index + 1}</h4>
                      <p>
                        <strong>UserName:</strong> {requestItem.username}
                      </p>
                      <p>
                        <strong>Contact Number:</strong> {requestItem.phone}
                      </p>
                      <p>
                        <strong>Status:</strong> {requestItem.status}
                      </p>

                      {requestItem.status === "pending" && (
                        <div>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleAccept(requestItem._id)}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDecline(requestItem._id)}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetActivityDetails;
