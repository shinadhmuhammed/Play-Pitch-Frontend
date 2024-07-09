import { useState, FormEvent } from "react";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate } from "react-router-dom";
import React from "react";

function ForgotOwner() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); 
  const [otpVerificationMessage, setOtpVerificationMessage] = useState(''); 
  const [passwordValidationMessage, setPasswordValidationMessage] = useState(''); 
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const response = await axiosInstance.post('/owner/otp-forgot', { email });
      console.log(response);
      setOtpSent(true); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axiosInstance.post('/owner/verify-forgot', { otp });
      console.log(response);
      setOtpVerified(true); 
      setOtpVerificationMessage('OTP verified successfully.');
    } catch (error) {
      console.log(error);
      setOtpVerificationMessage('OTP verification failed.');
    }
  };

  const handlePasswordChange = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordValidationMessage('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setPasswordValidationMessage('');
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    if (value !== newPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/owner/forgot-password', {
        email,
        otp,
        newPassword,
        confirmPassword
      });
      console.log(response);
      if (response.status === 204) {
        navigate('/owner/ownerlogin');
      }
    } catch (error) {
      console.log("Error occurred in forgot password", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            OTP
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>
          {otpSent && !otpVerified && ( 
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          )}
          <p>{otpVerificationMessage}</p>
        </div>
        {otpVerified && ( 
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  handlePasswordChange(e.target.value);
                }}
              />
              <p>{passwordValidationMessage}</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  handleConfirmPasswordChange(e.target.value);
                }}
              />
              {!passwordsMatch && <p>Passwords do not match.</p>}
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!passwordsMatch || !!passwordValidationMessage || !newPassword || !confirmPassword}

              >
                Reset Password
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ForgotOwner;
