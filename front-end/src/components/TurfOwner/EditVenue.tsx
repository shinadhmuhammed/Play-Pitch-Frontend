import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  image: string;
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
    image: "",
  });
  const { turfId } = useParams<{ turfId: string }>(); 

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const response = await axiosOwnerInstance.get<Turf>(`/owner/getownerturf/${turfId}`);
        setTurf(response.data);
      } catch (error) {
        console.error("Error fetching turf:", error);
      }
    };
    fetchTurf();
  }, [turfId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTurf(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event && event.target) {
//           setTurf(prevState => ({
//             ...prevState,
//             image: event.target.result as string // Set the image as base64 string
//           }));
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };
  
  


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosOwnerInstance.put(`/owner/editturf/${turfId}`, turf);
      console.log(response);
      // Handle success or navigate to another page
    } catch (error) {
      console.error("Error editing turf:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Turf</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="turfName"
          value={turf.turfName}
          onChange={handleChange}
          placeholder="Turf Name"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="address"
          value={turf.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="city"
          value={turf.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="aboutVenue"
          value={turf.aboutVenue}
          onChange={handleChange}
          placeholder="About Venue"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="facilities"
          value={turf.facilities}
          onChange={handleChange}
          placeholder="Facilities"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="time"
          name="openingTime"
          value={turf.openingTime}
          onChange={handleChange}
          placeholder="Opening Time"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="time"
          name="closingTime"
          value={turf.closingTime}
          onChange={handleChange}
          placeholder="Closing Time"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          name="price"
          value={turf.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-md"
        />
       <div className="flex flex-col">
        <img src={turf.image}></img>
          <input
            type="file"
            accept="image/*"
            id="image"
            // onChange={handleImageChange}
            className="w-full border rounded-md py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTurf;
