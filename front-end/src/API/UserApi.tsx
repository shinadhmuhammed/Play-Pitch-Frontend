/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, axiosUserInstance } from "../utils/axios/axios"



export const loginApi=async(data:any)=>{
    const response=await axiosInstance.post('/login',data)
    return response
}

export const requestedUserId=async(data:any)=>{
    try {
        const response=await axiosUserInstance.post('/requestedId',data)
        return response
    } catch (error) {
        console.log(error)
    }
}


export const getActivityId = async (id: string) => {
    try {
      const response = await axiosUserInstance.get(`/getactivityid/${id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  export const getRating =async(userId:string)=>{
    try {
      const response=await axiosUserInstance.post('/getrating',{userId})
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error);
      throw error;
    }
  }



