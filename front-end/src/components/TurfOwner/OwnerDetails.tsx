import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { axiosOwnerInstance } from "../../utils/axios/axios";
import Navbar from "./Navbar";
import React from "react";

interface FormData {
  email: string;
  phone: string;
}

function OwnerDetails() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axiosOwnerInstance.get("/owner/ownerdetails");
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwnerDetails();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSuccessMessage('')
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosOwnerInstance.put("/owner/editownerdetails", formData);
      setSuccessMessage("Owner details updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-8 mx-auto max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Owner Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-1 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Update Details
          </button>

          {successMessage && (
            <div className="text-green-500 mt-2">{successMessage}</div>
          )}

          <div className="text-center mt-4">
            <a href="/owner/ownerprofile" className="text-blue-500 hover:text-blue-700">
              Back To Profile
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default OwnerDetails;
