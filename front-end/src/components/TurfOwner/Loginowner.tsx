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
      className="flex justify-center items-center min-h-screen bg-gray-100" 
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        <form 
          className="bg-white shadow-2xl rounded-lg px-12 pt-10 pb-8 mb-4 backdrop-blur-sm bg-opacity-80"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">
            Owner Login
          </h1>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email "
            >
              Email
            </label>
            <input
              className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
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
