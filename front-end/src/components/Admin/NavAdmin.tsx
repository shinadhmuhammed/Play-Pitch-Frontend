import { useDispatch } from "react-redux";
import { adminLogout } from "../../services/Redux/slice/adminSlices";
import { useNavigate } from "react-router-dom";
import React from "react";



function NavAdmin() {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        dispatch(adminLogout())
        navigate('/admin/adminlogin')
      };


    
  return (
    <div>
            <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-white text-lg font-semibold">
                𝓐𝓭𝓶𝓲𝓷 𝓟𝓪𝓷𝓮𝓵
                </span>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a
                    href="/admin/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/admin/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </a>
                  <a
                    href="/admin/venue-request"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Venue Requests
                  </a>
                  <a
                    href="/admin/wallet"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Wallet
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
    </div>
  )
}

export default NavAdmin
