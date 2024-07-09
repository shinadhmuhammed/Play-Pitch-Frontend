import { ChangeEvent, FormEvent, useState } from "react";
import { axiosOwnerInstance } from "../../utils/axios/axios";
import Navbar from "./Navbar";
import React from "react";

function ChangePasswordOwner() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { newPassword, confirmPassword } = formData;

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      if (!strongRegex.test(newPassword)) {
        setError("Password must contain at least one alphabet, one number, and one special character");
        return;
      }
      const response = await axiosOwnerInstance.post('/owner/change-password', { newPassword });
      setMessage(response.data.message);
      setFormData({ newPassword: "", confirmPassword: "" });
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-1">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {message && <p className="text-green-500 mb-2">{message}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Change Password
          </button>
        </form>
        <div className="text-center mt-4">
            <a href="/owner/ownerprofile" className="text-blue-500 hover:text-blue-700">
              Back To Profile
            </a>
          </div>
      </div>
    </>
  );
}

export default ChangePasswordOwner;
