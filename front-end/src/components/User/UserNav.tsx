import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/Redux/slice/userSlices";


function UserNav() {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const handleLogout = () => {
        localStorage.removeItem('userToken');
        dispatch(userLogout());
        navigate('/login');
      }


  return (
    <div>
      <nav className="p-6 border-b border-gray-300 shadow-lg">
      <h1 className="text-3xl font-bold text-black cursor-pointer hover:text-gray-300 flex items-center space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15h-2v-2h2v2zm0-4h-2V7h2v4zm-4 4H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm4 8h-2v-2h2v2zm0-4h-2V7h2v4z"/>
  </svg>
  <span className="text-green-500">Play</span>
  <span className="text-blue-500">Pitch</span>
</h1>



      <div className="flex justify-end items-center">
        <a href="#" className="px-3 text-black cursor-pointer hover:text-gray-300">Play</a>
        <a href="/home" className="px-3 text-black cursor-pointer hover:text-gray-300">View Turf</a>
        <div className="relative">
          <button onClick={toggleDropdown} className="px-3 text-black cursor-pointer hover:text-gray-300 focus:outline-none">
            Profile
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Your Bookings</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default UserNav
