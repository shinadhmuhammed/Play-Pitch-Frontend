import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import UserNav from "./UserNav";
import Profiles from "./Profiles";
import { axiosUserInstance } from "../../utils/axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfilePhoto } from "../../services/Redux/slice/userSlices";
import { RootState } from "../../services/Redux/Store/store";

interface FormData {
  username: string;
  email: string;
  phone: string;
  profilePhoto: File | null;
}

const UserDetails: React.FC = () => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState<string>("");
  const profilePhoto = useSelector(
    (state: RootState) => state.user.profilePhoto
  );

  console.log(profilePhoto);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    profilePhoto: null,
  });
  const [editSuccess, setEditSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosUserInstance.get("/userdetails");
        console.log(response.data)
        const userData = response.data;
        setPhoto(response.data.profilePhotoUrl);
        setFormData({
          ...formData,
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          profilePhoto: userData.profilePhoto || null,
        });
        await new Promise((res) =>
          setTimeout(() => {
            res;
          }, 1000)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setEditSuccess(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePhoto: file });
      setPhoto(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      if (formData.profilePhoto) {
        formDataToSend.append(
          "profilePhoto",
          formData.profilePhoto,
          formData.profilePhoto.name
        );
      }
      const response = await axiosUserInstance.post(
        "/userDetailsEdit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (formData.profilePhoto) {
        dispatch(
          updateUserProfilePhoto({ profilePhoto: formData.profilePhoto })
        );
      }
      console.log(response.data);
      setEditSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <UserNav />
      <div className="flex space-x-6">
        <Profiles />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 justify-center px-72"
        >
         <div>
      <img
        src={photo}
        alt="Profile"
        style={{
          height: '200px', 
          width: '200px',   
          borderRadius: '50%',  
          objectFit: 'cover',  
        }}
      />
    </div>

          <input
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
            className="px-4 py-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="px-4 py-2 border border-gray-300 rounded"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded"
          />
          {/* Phone input field */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="px-32 py-3 border border-gray-300 rounded"
          />
          {editSuccess && <p className="text-green-500">Edit successful</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
