import React, { useState } from 'react';
import { axiosInstance } from '../../utils/axios/axios';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate=useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async(e:React.FormEvent) => {
    e.preventDefault()
    try {
      const response=await axiosInstance.post('/login',loginData)
      navigate('/home')
      console.log('Login clicked:', response);
    } catch (error) {
      console.log(error)
    }
    
  };
  

  // const handleForgotPassword = () => {
  //   // Implement your forgot password logic here
  //   console.log('Forgot Password clicked');
  // };


  return (
    <div>
      <h3 className="flex justify-center mt-20 font-bold ">Login</h3>
      <div className="max-w-md mx-auto mt-20 ">
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mb-4 flex justify-between">
          <button
            type="button"
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
          <a href="/forgot-password" className="text-gray-600 text-sm">Forgot Password?</a>
        </div>
        </form>

        <div className="text-center">
          <span className="text-gray-600 text-sm">
            Don't have an account? <a href="/signup" className="text-green-500">Register</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
