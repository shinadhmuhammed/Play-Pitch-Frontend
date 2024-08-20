import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import background from '../../assets/images/bg.jpg'
import React from "react";

interface UserData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

function UserSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserData>();
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/ownerhome");
    }
  }, [navigate]);





  const onSubmit: SubmitHandler<UserData> = async (data) => {
    try {
      if (showOtpField) {
        const response = await axiosInstance.post("/verify-otp", {
          ...data,
          userId,
        });
        console.log("Server response:", response.data);
        if (response.data.status === 200) {
          setSuccessMessage("User registered successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setErrorMessage("Invalid OTP");
          setErrorMessage("");
        }
      } else {
        const response = await axiosInstance.post("/signup", data);
        console.log("Server response:", response.data);
        setShowOtpField(true);
        setUserId(response.data.userId);
        setEmail(data.email);
        setResendDisabled(true);
        const timer = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          setResendDisabled(false);
          setCountdown(60);
        }, 60000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Invalid OTP");
    }
  };


  const password = watch("password");

  const handleResendOtp = async () => {
    try {
      setResendDisabled(true);
      const response = await axiosInstance.post("/resendotp", { email });
      console.log("Resend OTP response:", response.data);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const validatePassword = (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return (
      regex.test(value) ||
      "Password must be strong (minimum 6 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" style={{ backgroundColor: "gainsboro" }}>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-6">
            Create your account
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
  
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter your username"
              />
              {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username.message}</span>}
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter Your Gmail"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>
  
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phone"
                type="number"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter Your Password"
              />
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>
  
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>}
            </div>
  
            {showOtpField && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  id="otp"
                  type="text"
                  {...register("otp", { required: "OTP is required" })}
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter OTP"
                />
                {errors.otp && <span className="text-red-500 text-xs mt-1">{errors.otp.message}</span>}
                {errorMessage && <span className="text-red-500 text-xs mt-1">{errorMessage}</span>}
              </div>
            )}
  
            <div className="flex flex-col sm:flex-row justify-between items-center">
              {showOtpField ? (
                <>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto ${resendDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={resendDisabled}
                  >
                    {resendDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
                >
                  Get OTP
                </button>
              )}
            </div>
          </form>
  
          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-green-500 hover:text-green-600">
                Sign In
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
