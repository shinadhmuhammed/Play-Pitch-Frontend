import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/Redux/slice/userSlices";

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
      
      <div className="max-w-sm py-36 mt-8 p-6 ml-7 rounded-lg border shadow-2xl w-full space-y-12 relative z-10">
        <div className="profile-section">
          <a href="/booking" className="text-lg font-semibold">
            Your Bookings
          </a>
        </div>
        <div className="profile-section">
          <a href="/details" className="text-lg font-semibold">
            Personal Details
          </a>
        </div>
        <div className="profile-section">
          <a href="/password-change" className="text-lg font-semibold">
           Reset Password
          </a>
        </div>
        <div className="profile-section">
          <a href="/wallet" className="text-lg font-semibold">
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
