import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosOwnerInstance } from "../../utils/axios/axios";

interface Turf {
  _id: string;
  turfName: string;
  address: string;
  city: string;
  aboutVenue: string;
  facilities: string;
  openingTime: string;
  closingTime: string;
  price: number;
  courtType: string;
  images: string[];
}

const EditTurf: React.FC = () => {
  const [turf, setTurf] = useState<Turf>({
    _id: "",
    turfName: "",
    address: "",
    city: "",
    aboutVenue: "",
    facilities: "",
    openingTime: "",
    closingTime: "",
    price: 0,
    courtType: "",
    images: [],
  });
  const { turfId } = useParams<{ turfId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const response = await axiosOwnerInstance.get<Turf>(
          `/owner/getownerturf/${turfId}`
        );
        setTurf(response.data);
      } catch (error) {
        console.error("Error fetching turf:", error);
      }
    };
    fetchTurf();
  }, [turfId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTurf((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosOwnerInstance.put(
        `/owner/editturf/${turfId}`,
        turf
      );
      console.log(response);
      navigate("/owner/venue");
    } catch (error) {
      console.error("Error editing turf:", error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event && event.target) {
          setTurf((prevState) => ({
            ...prevState,
            images: [...prevState.images, event.target.result as string],
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setTurf((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6 text-center">Edit Turf</h1>
  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
    <div className="space-y-2">
      <label htmlFor="turfName" className="block text-sm font-medium text-gray-700">
        Turf Name
      </label>
      <input
        type="text"
        name="turfName"
        value={turf.turfName}
        onChange={handleChange}
        placeholder="Turf Name"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
        Address
      </label>
      <input
        type="text"
        name="address"
        value={turf.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
        City
      </label>
      <input
        type="text"
        name="city"
        value={turf.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="aboutVenue" className="block text-sm font-medium text-gray-700">
        About Venue
      </label>
      <textarea
        name="aboutVenue"
        value={turf.aboutVenue}
        onChange={handleChange}
        placeholder="About Venue"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="courtType" className="block text-sm font-medium text-gray-700">
        Court Type
      </label>
      <input
        type="text"
        name="courtType"
        value={turf.courtType}
        onChange={handleChange}
        placeholder="Court Type"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">
        Facilities
      </label>
      <textarea
        name="facilities"
        value={turf.facilities}
        onChange={handleChange}
        placeholder="Facilities"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">
        Opening Time
      </label>
      <input
        type="time"
        name="openingTime"
        value={turf.openingTime}
        onChange={handleChange}
        placeholder="Opening Time"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">
        Closing Time
      </label>
      <input
        type="time"
        name="closingTime"
        value={turf.closingTime}
        onChange={handleChange}
        placeholder="Closing Time"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
        Price
      </label>
      <input
        type="number"
        name="price"
        value={turf.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="images" className="block text-sm font-medium text-gray-700">
        Images
      </label>
      <div>
      <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            className="rounded-md py-2"
          />
        </div>
      <div className="flex items-center space-x-2">
        {turf.images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              className="w-60 h-60 object-contain"
              alt={`Turf Image ${index}`}
            />
            
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </div>
          
        ))}
       
        <label htmlFor="image" className="flex items-center justify-center w-60 h-60 border rounded-md border-dashed border-gray-400 cursor-pointer hover:bg-gray-100 focus:outline-none">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </label>
      </div>
    </div>
    <button
      type="submit"
      className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
    >
      Save Changes
    </button>
  </form>
</div>
  );
};

export default EditTurf;
