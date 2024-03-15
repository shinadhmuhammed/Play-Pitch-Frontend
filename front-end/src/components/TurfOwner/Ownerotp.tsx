import { useState, ChangeEvent, FormEvent } from "react";
import { axiosInstance } from "../../utils/axios/axios";

function Ownerotp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/owner/verifyotp', { email, otp });
      if (response.data.status === 200) {
        setVerificationStatus("OTP verified successfully");
        // Add logic to navigate to the next page upon successful OTP verification
      } else {
        setVerificationStatus("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          OTP Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={handleEmailChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Verify OTP
              </button>
            </div>

            {verificationStatus && (
              <div className="mt-4 text-center">
                <span className="text-gray-600 text-sm">{verificationStatus}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ownerotp;
