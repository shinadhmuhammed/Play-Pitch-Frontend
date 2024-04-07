import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import UserNav from './UserNav';
import Profiles from './Profiles';
import { axiosUserInstance } from '../../utils/axios/axios';

interface FormData {
  username: string;
  email: string;
  phone: string;
}

const UserDetails: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
  });
  const [editSuccess, setEditSuccess] = useState<boolean>(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosUserInstance.get('/userdetails');
        console.log(response.data)
        const userData = response.data;
        setFormData(userData);
      } catch (error) {
        console.log(error)
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setEditSuccess(false); 
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosUserInstance.put('/userDetailsEdit', formData);
      console.log(response)
      setEditSuccess(true); 
     

    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (
    <div className='flex flex-col space-y-6'>
      <UserNav />
      <div className='flex space-x-6'>
        <Profiles />
        <form onSubmit={handleSubmit} className='flex flex-col space-y-6 justify-center px-72'>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className='px-4 py-2 border border-gray-300 rounded'
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className='px-4 py-2 border border-gray-300 rounded'
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className='px-32 py-3 border border-gray-300 rounded'
          />
          {editSuccess && <p className="text-green-500">Edit successful</p>}
          <button type="submit" className='px-4 py-2 bg-blue-600 text-white rounded'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
