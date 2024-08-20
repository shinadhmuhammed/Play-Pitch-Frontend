import { useState, FormEvent } from "react";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ownerLogin } from "../../services/Redux/slice/ownerSlices";
import React from "react";
import background from "../../assets/images/bg.jpg";

function Loginowner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/owner/ownerlogin", {
        email,
        password,
      });
  
      if (response.status === 200 && response.data.status === 200) {
        const token = response.data.token;
        localStorage.setItem("ownerToken", token);
        dispatch(ownerLogin(response.data));

        if (!response.data.turfAdded) {
          navigate("/owner/ownerhome");
        } else {
          navigate("/owner/ownerdashboard");
        }
      } else {
        console.log("Server error occurred");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };
  


  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4"
    >
      <div className="w-full max-w-md">
        <form 
          className="bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-8 mb-4 backdrop-filter backdrop-blur-lg bg-opacity-30"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">
            Owner Login
          </h1>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 mb-4 sm:mb-0 w-full sm:w-auto"
              type="submit"
            >
              Sign In
            </button>
            <Link
              to="/owner/forgotpassword"
              className="text-blue-500 hover:text-blue-700 text-sm font-semibold transition duration-300 ease-in-out"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/owner/ownersignup"
                className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300 ease-in-out"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Loginowner;
