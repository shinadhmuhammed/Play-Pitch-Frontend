import { useState } from "react";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../services/Redux/slice/adminSlices";
import React from "react";
import background from "../../assets/images/bg.jpg";



function LoginAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/admin/adminlogin', { email, password });
            console.log(response);
            const token = response.data.token;
            localStorage.setItem('adminToken', token);
            const adminEmail = email;
            dispatch(adminLogin({ adminEmail, token }));
            navigate('/admin/dashboard');
           
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div
          className="min-h-screen flex flex-col justify-center items-center bg-gray-100"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-96">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

export default LoginAdmin;
