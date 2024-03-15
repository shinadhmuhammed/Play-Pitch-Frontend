import { useState } from "react";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/Redux/slice/userSlices";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

function UserLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin: SubmitHandler<FormData> = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(userLogin(response.data));
      navigate("/home");
    } catch (error) {
      setServerError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@gmail\.com$/,
                      message: "Please enter a valid Gmail address",
                    },
                  })}
                  className="p-2 border rounded-md w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="p-2 border rounded-md w-full"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {serverError && (
              <p className="text-red-500 text-sm mb-4">{serverError}</p>
            )}{" "}
            {/* Display server error if exists */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Login
              </button>
              <a href="/forgot-password" className="text-gray-600 text-sm">
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-green-500">
                Register
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
