import { useParams } from "react-router-dom";
import UserNav from "./UserNav";
import { useEffect, useState } from "react";
import { axiosUserInstance } from "../../utils/axios/axios";
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Game {
    userName: string;
    activityName: string;
    date: string;
    slot: string;
}

function GetActivityDetails() {
    const { id } = useParams();
    const [activity, setActivity] = useState<Game | null>(null);
    const [isRequesting, setIsRequesting] = useState(false);
    const [hasRequested, setHasRequested] = useState(false); // New state variable

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axiosUserInstance.get(`/getactivityid/${id}`);
                setActivity(response.data);
                // Check if the current user has already requested to join the activity
                if (response.data.joinRequests.some((request: { user: any; }) => request.user === userId)) {
                    setHasRequested(true);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchActivity();
    }, [id]);

    function handleRequest() {
        setIsRequesting(true);
        axiosUserInstance.post(`/activityrequest/${id}`)
            .then(response => {
                console.log('Request sent successfully');
                console.log(response);
                setHasRequested(true);
            })
            .catch(error => {
                console.error('Error sending request:', error);
            })
            .finally(() => {
                setIsRequesting(false);
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function formatDateTime(dateTime: any) {
        const dateObject = new Date(dateTime);
        const formattedDate = `${
            dateObject.getMonth() + 1
            }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
        return formattedDate;
    }

    return (
        <div>
            <UserNav  />
            <div className="ml-20 mr-20 mt-20  border">
                <div className="flex h-60">
                    <img className="ml-10 mt-10 h-44 w-40 object-center" src="/images/profilepin.jpg" alt="profile-pic" />
                    <div className="ml-10 mt-10">
                        {activity ? (
                            <div>
                                <h1><FontAwesomeIcon icon={faGamepad} /> {activity.activityName}</h1>
                                <h1>{activity.userName}</h1>
                                <h1>{formatDateTime(activity.date)}</h1>
                                <h1>{activity.slot}</h1>
                            </div>
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mr-10 mb-10">
                    <button
                        onClick={handleRequest}
                        disabled={isRequesting} 
                        className="mr-10 py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        {isRequesting ? 'Requesting...' : 'Request'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GetActivityDetails;
