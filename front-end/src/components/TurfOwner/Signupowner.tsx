import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Owner SignUp
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-grey py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                  className={`p-2 border rounded-md w-full ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="text-red-500 text-sm">
                {errors.email?.type === "required" && "Email is required"}
              </div>
              <div className="text-red-500 text-sm">
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
                  type="tel"
                  id="phone"
                  {...register("phone", { required: true })}
                  className={`p-2 border rounded-md w-full ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="text-red-500 text-sm">
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
                  className={`p-2 border rounded-md w-full ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="text-red-500 text-sm">
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
                  className={`p-2 border rounded-md w-full ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="text-red-500 text-sm">
                {errors.confirmPassword && "Confirm Password is required"}
              </div>
            </div>
            <div className="text-red-500 text-sm">{verificationStatus}</div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/owner/ownerlogin" className="text-green-500">
                Login
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signupowner;
