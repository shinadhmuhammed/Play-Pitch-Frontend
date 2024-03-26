import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";

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

  

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (resendDisabled) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0 || !resendDisabled) {
      if (timer) {
        clearTimeout(timer);
      }
      setResendDisabled(false);
      setCountdown(60);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [resendDisabled, countdown]);

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    try {
      if (showOtpField) {
        const response = await axiosInstance.post("/verify-otp", {
          ...data,
          userId,
        });
        console.log("Server response:", response.data);
        if (response.data.status === 200) {
          setSuccessMessage("user registered successfully");
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
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {successMessage && (
              <div className="text-green-500 font-semibold">
                {successMessage}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {showOtpField && (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  {...register("otp", { required: "OTP is required" })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.otp && (
                  <span className="text-red-500">{errors.otp.message}</span>
                )}
                {errorMessage && (
                  <span className="text-red-500">{errorMessage}</span>
                )}
              </div>
            )}

            <div className="flex justify-between">
              {showOtpField ? (
                <>
                  <button
                    type="submit"
                    className="bg-green-500 px-1 text-white  rounded-md"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className={`bg-blue-500 text-white px-2 py-1 rounded-md ${
                      resendDisabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={resendDisabled}
                  >
                    {resendDisabled
                      ? `Resend OTP (${countdown} seconds)`
                      : "Resend OTP"}
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-2 rounded-md"
                >
                  Get OTP
                </button>
              )}
              <span className="text-gray-600 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-green-500">
                  Sign In
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
