import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import React from "react";

interface UserData {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function Signupowner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();
  const [verificationStatus, setVerificationStatus] = useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    const { email, phone, password, confirmPassword } = data;
    try {
      if (password !== confirmPassword) {
        setVerificationStatus("Passwords do not match");
        return;
      }

      if (!/(?=.*[a-zA-Z])(?=.*[@#$%^&+=!])(?=.*\d).{8,}/.test(password)) {
        setVerificationStatus(
          "Password must contain at least one alphabet, one special character, and must be at least 8 characters long"
        );
        return;
      }

      if (phone.length !== 10) {
        setVerificationStatus("Phone number must be 10 digits");
        return;
      }

      const response = await axiosInstance.post("/owner/ownersignup", {
        email,
        phone,
        password,
      });
      navigate("/owner/ownerotp", {
        state: {
          email: data.email,
          phone: data.phone,
          password: data.password,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-green-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-white shadow-sm">
          Owner SignUp
        </h2>
      </div>
  
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className={`p-3 border rounded-md w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="text-red-500 text-xs mt-1">
                {errors.email?.type === "required" && "Email is required"}
                {errors.email?.type === "pattern" && "Invalid email format"}
              </div>
            </div>
            
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="phone"  
                  {...register("phone", { required: true })}
                  className={`p-3 border rounded-md w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="text-red-500 text-xs mt-1">
                {errors.phone && "Phone is required"}
              </div>
            </div>
            
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  className={`p-3 border rounded-md w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="text-red-500 text-xs mt-1">
                {errors.password && "Password is required"}
              </div>
            </div>
            
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", { required: true })}
                  className={`p-3 border rounded-md w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="text-red-500 text-xs mt-1">
                {errors.confirmPassword && "Confirm Password is required"}
              </div>
            </div>
            
            <div className="text-red-500 text-sm">{verificationStatus}</div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or
                </span>
              </div>
            </div>
  
            <div className="mt-6 text-center">
              <span className="text-gray-600 text-sm">
                Already have an account?{" "}
                <a href="/owner/ownerlogin" className="font-medium text-green-600 hover:text-green-500 transition duration-150 ease-in-out">
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Signupowner;
