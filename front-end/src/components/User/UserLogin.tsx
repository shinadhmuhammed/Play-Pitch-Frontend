import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/Redux/slice/userSlices";
import { useForm, SubmitHandler } from "react-hook-form";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loginApi } from "../../API/UserApi";
const googleMapsApiKey=import.meta.env.VITE_REACT_APP_CLIENTID

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
      const response = await loginApi({
        email: formData.email,
        password: formData.password,
      });
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      dispatch(userLogin(response.data));
      navigate("/home");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message === "user is blocked") {
          localStorage.removeItem("userToken");
        }
        setServerError(error.response.data.message);
      } else {
        setServerError("An error occurred while processing your request.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken ");
    if (token) {
      navigate("/home");
    }
  });

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const { credential } = credentialResponse;

    try {
      const response = await axiosInstance.post("/google-login", {
        credential,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("userToken", token);

        dispatch(userLogin(response.data));

        navigate("/home");
      } else {
        console.error("Failed to store user data in the database.");
      }
    } catch (error) {
      console.error("Error while processing Google login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center sm:px-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
       
        {/* <div className="flex justify-center ">
          <img src="/images/play-pitch logo.png" className="object-contain h-40 " alt="Play Pitch Logo" />
        </div> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ml-10 mr-10 mb-10">
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
            )}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 sm:mb-0 sm:mr-2"
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

          <div className="mt-6 flex justify-center">
            <GoogleOAuthProvider clientId={googleMapsApiKey}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
