import { useDispatch } from "react-redux";
import { ownerLogout } from "../../services/Redux/slice/ownerSlices";
import { useNavigate } from "react-router-dom";
import React from "react";



function Ownerhome() {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("ownerToken");
        dispatch(ownerLogout());
        navigate("/owner/ownerlogin");
      };

 

    return (
        <div>
           <nav className=" p-4">
        <div className="container mx-auto flex justify-between shadow-md p-9">
          <div className="flex items-center space-x-4 ">
            
          </div>
          <div>
            <button onClick={handleLogout} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
          </div>
        </div>
      </nav>

            <div className="bg-green-500 p-16 ml-10 mr-10 mt-20 rounded-lg">
                <p className="text-center text-gray-900 mb-12 font-bold">Please add your venue to get partnered with us</p>
                <a href="/owner/addvenue" className="w-full bg-black hover:bg-green-400 text-white font-bold py-2 px-4 rounded flex justify-center">Add Your Venue</a>
            </div>
        </div>
    );
}

export default Ownerhome;
