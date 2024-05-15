import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios/axios";

function Ownerotp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, phone, password } = location.state;

  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (resendTimer !== null) {
        clearTimeout(resendTimer);
      }
    };
  }, [resendTimer]);

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/owner/verifyotp', { otp, email, password, phone });
      if (response.data.status === 200) {
        setVerificationStatus("OTP verified successfully");
        setTimeout(() => { navigate('/owner/ownerlogin'); }, 3000);
      } else {
        setVerificationStatus('Invalid OTP');
      }
    } catch (error) {
      console.log(error);
      setVerificationStatus('Invalid OTP');
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axiosInstance.post('/owner/resendotp', { email });
      if (response.status === 200) {
        setVerificationStatus('OTP resent successfully');
        setResendDisabled(true);
        const timer = setTimeout(() => {
          setResendDisabled(false);
        }, 60000);
        setResendTimer(timer as unknown as number);

    
        let timeLeft = 60;
        const countdown = setInterval(() => {
          timeLeft--;
          if (timeLeft <= 0) {
            clearInterval(countdown);
          }
          setRemainingTime(timeLeft);
        }, 1000);
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
        <div className="bg-grey py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="button"
                className={`bg-green-500 text-white px-4 py-2 rounded-md ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleResendOTP}
                disabled={resendDisabled}
              >
                Resend OTP {remainingTime !== null && `(${remainingTime}s)`}
              </button>
            </div>

            {verificationStatus && (
              <div className="mt-4 text-center">
                <span className={verificationStatus === "Invalid OTP" ? "text-red-500 text-sm" : "text-gray-600 text-sm"}>{verificationStatus}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ownerotp;
