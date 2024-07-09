import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/Redux/slice/userSlices";
import React from "react";

function Profiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <div className="relative">
  <div className="max-w-sm py-10  px-6 mt-24  ml-16 rounded-lg border shadow-2xl w-full space-y-16  relative z-10 bg-white">
    <div className="profile-section">
      <a href="/booking" className="text-lg font-semibold text-gray-800 hover:text-blue-600 ">
        Your Bookings
      </a>
    </div>
    <div className="profile-section">
      <a href="/details" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
        Personal Details
      </a>
    </div>
    <div className="profile-section">
      <a href="/password-change" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
        Reset Password
      </a>
    </div>
    <div className="profile-section">
      <a href="/getActivity" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
        Activity
      </a>
    </div>
    <div className="profile-section">
      <a href="/wallet" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
        Wallet
      </a>
    </div>
    <div className="profile-section">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
    </div>
  </div>
</div>

  );
}

export default Profiles;
