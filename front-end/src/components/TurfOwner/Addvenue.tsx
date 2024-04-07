import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { axiosOwnerInstance } from "../../utils/axios/axios";
import Navbar from "./Navbar";
import TurfLocation from "./TurfLocation";

function Addvenue() {
  const navigate = useNavigate();

  const [turfName, setTurfName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [aboutVenue, setAboutVenue] = useState("");
  const [facilities, setFacilities] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [price, setPrice] = useState("");
  const [courtType, setCourtType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append("file", image);
      });
      formData.append("latitude", selectedLocation.lat.toString());
      formData.append("longitude", selectedLocation.lng.toString());
      formData.append("turfName", turfName);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("aboutVenue", aboutVenue);
      formData.append("facilities", facilities);
      formData.append("openingTime", openingTime);
      formData.append("closingTime", closingTime);
      formData.append("price", price);
      formData.append("courtType", courtType);

      const storedToken = localStorage.getItem("ownerToken");
      if (!storedToken) {
        console.error("Token not found");
        return;
      }

      const response = await axiosOwnerInstance.post(
        "/owner/addturf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setTurfName("");
      setAddress("");
      setCity("");
      setAboutVenue("");
      setFacilities("");
      setOpeningTime("");
      setClosingTime("");
      setPrice("");
      setCourtType("");
      setImages([]);
      navigate("/owner/verification-pending");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        <div className="w-1/2">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="turfName"
              >
                Turf Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="turfName"
                type="text"
                value={turfName}
                onChange={(e) => setTurfName(e.target.value)}
                placeholder="Turf Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="aboutVenue"
              >
                About Venue
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="aboutVenue"
                value={aboutVenue}
                onChange={(e) => setAboutVenue(e.target.value)}
                placeholder="About Venue"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="facilities"
              >
                Facilities
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="facilities"
                type="text"
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                placeholder="Facilities"
              />
            </div>

            <div className="mb-4 flex">
              <div className="w-1/2 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="openingTime"
                >
                  Opening Time
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="openingTime"
                  type="time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
              </div>

              <div className="w-1/2 ml-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="closingTime"
                >
                  Closing Time
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="closingTime"
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="courtType"
              >
                Court Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="courtType"
                value={courtType}
                onChange={(e) => setCourtType(e.target.value)}
              >
                <option value="">Select Court Type</option>
                <option value="7-aside">7-aside</option>
                <option value="5-aside">5-aside</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    setImages(Array.from(files));
                  }
                }}
              />
            </div>
            <TurfLocation setSelectedLocation={setSelectedLocation} />

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addvenue;
