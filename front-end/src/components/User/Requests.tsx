import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { axiosUserInstance } from "../../utils/axios/axios";
import UserNav from "./UserNav";
import Profiles from "./Profiles";

// Define types inline
interface JoinRequest {
  _id: string;
  user: string;
  status: string;
}

interface Activity {
  _id: string;
  activityName: string;
  description: string;
  date: string;
  slot: string;
  turfName: string;
  address: string;
  maxPlayers: number;
  joinRequests: JoinRequest[];
}

const Requests: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response: AxiosResponse<Activity> = await axiosUserInstance.get('/getrequest');
        setActivity(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivity();
  }, []);

  const handleAccept = async (joinRequestId: string) => {
    try {
      await axiosUserInstance.put(`/acceptJoinRequest/${activity?._id}/${joinRequestId}`);
      const response: AxiosResponse<Activity> = await axiosUserInstance.get('/getrequest');
      setActivity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (joinRequestId: string) => {
    try {
      await axiosUserInstance.put(`/declineJoinRequest/${activity?._id}/${joinRequestId}`);
      // Refresh activity data after declining
      const response: AxiosResponse<Activity> = await axiosUserInstance.get('/getrequest');
      setActivity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <UserNav />
      <div className="flex space-x-6">
   
        {activity && (
          <div className="flex flex-col ml-10">
            <h2 className="text-2xl font-bold mb-4">{activity.activityName}</h2>
            <p className="mb-2">Description: {activity.description}</p>
            <p className="mb-2">Date: {activity.date}</p>
            <p className="mb-2">Slot: {activity.slot}</p>
            <p className="mb-2">Turf Name: {activity.turfName}</p>
            <p className="mb-2">Address: {activity.address}</p>
            <p className="mb-2">Max Players: {activity.maxPlayers}</p>
            <h3 className="text-lg font-bold mb-2">Join Requests:</h3>
            <ul>
              {activity.joinRequests.map((request: JoinRequest) => (
                <li key={request._id} className="mb-4">
                  <span className="font-bold">User ID:</span> {request.user}<br />
                  <span className="font-bold">Status:</span> {request.status}
                  {/* Conditionally render buttons */}
                  {request.status !== "accepted" && request.status !== "declined" && (
                    <>
                      <button
                        onClick={() => handleAccept(request._id)}
                        className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(request._id)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;
