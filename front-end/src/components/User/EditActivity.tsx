import React, { useState } from 'react';


interface EditActivityModalProps {
  activity: Activity;
  onSave: (editedActivity: Activity) => void;
  onClose: () => void;
}

interface Activity {
  activityName: string;
  description: string;
  maxPlayers: number;
}

const EditActivity: React.FC<EditActivityModalProps> = ({ activity, onSave, onClose }) => {
  const [editedActivity, setEditedActivity] = useState<Activity>(activity);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedActivity((prevState: Activity) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedActivity);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-container bg-white rounded-lg shadow-lg overflow-hidden">
        <span className="absolute top-0 right-0 mr-4 mt-4 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Edit Activity</h2>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-bold">Activity Name</label>
            <input type="text" name="activityName" value={editedActivity.activityName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-bold">Description</label>
            <input type="text" name="description" value={editedActivity.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-bold">Max Players</label>
            <input type="number" name="maxPlayers" value={editedActivity.maxPlayers} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" />
          </div>
          <button onClick={handleSave} className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditActivity;
