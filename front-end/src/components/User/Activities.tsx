
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Profiles from './Profiles';
import UserNav from './UserNav';
import { RootState } from '../../services/Redux/Store/store';
import { axiosUserInstance } from '../../utils/axios/axios';
import EditActivity from './EditActivity';


interface Activity {
  _id: string;
  activityName: string;
  address: string;
  slot: string;
  date: string;
  turfName: string;
  maxPlayers: number;
  description: string;
}

function Activities() {
  const userId = useSelector((state: RootState) => state.user.userId);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editActivity, setEditActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axiosUserInstance.post('/getActivity', { userId });
        setActivities(response.data.userActivity);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
  }, [userId]);

  const handleEdit = (activity: Activity) => {
    setEditActivity(activity);
    setIsModalOpen(true);
  };

  const handleSave = async (editedActivity: Activity) => {
    try {
      await axiosUserInstance.put(`/activities/${editedActivity._id}`, editedActivity);
      
     
      setActivities(activities.map(activity => 
        activity._id === editedActivity._id ? editedActivity : activity
      ));
      
      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function formatDateTime(dateTime: string) {
    const dateObject = new Date(dateTime);
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  }

  return (
    <>
    <div
      className="relative"
      style={{
        backgroundImage: `url('/images/bg3.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <UserNav />
      <div className="flex">
        <div>
          <Profiles />
        </div>
        <div className="mr-96 p-20 w-full ml-16">
          <h1 className="text-3xl font-bold mb-4">Activities</h1>
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity._id} className="mb-8 p-4 rounded-lg shadow-lg bg-white">
                <div className="flex justify-between mb-2">
                  <h2 className="text-xl font-bold">{activity.activityName}</h2>
                  <button onClick={() => handleEdit(activity)}>Edit</button>
                </div>
                <p><span className="font-bold">Address:</span> {activity.address}</p>
                <p><span className="font-bold">Slot:</span> {activity.slot}</p>
                <p><span className="font-bold">Date:</span> {formatDateTime(activity.date)}</p>
                <p><span className="font-bold">Turf Name:</span> {activity.turfName}</p>
                <p><span className="font-bold">Maximum Players:</span> {activity.maxPlayers}</p>
                <p><span className="font-bold">Description:</span> {activity.description}</p>
              </div>
            ))
          ) : (
            <p>No activities found.</p>
          )}
        </div>
        
        {isModalOpen && (
          <div className="modal-container">
            <EditActivity
              activity={editActivity}
              onSave={handleSave}
              onClose={handleCloseModal}
            />
          </div>
        )}
      </div>
    </div>
  </>
  
  );
}

export default Activities;
