import axios, { AxiosInstance } from 'axios';


const createAxiosInstance = (token: string | null, role: string | null): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
  });
  if (token) {
    instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.role = role;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

const userToken: string | null = localStorage.getItem('token');
const userRole: string | null = 'user'; 
const ownerToken: string | null = localStorage.getItem('token');

const ownerRole: string | null = 'owner'; 
console.log(ownerToken,ownerRole)

const axiosUserInstance = createAxiosInstance(userToken, userRole);
const axiosOwnerInstance = createAxiosInstance(ownerToken, ownerRole);
const axiosInstance = createAxiosInstance(null , null)

export { axiosInstance,axiosOwnerInstance,axiosUserInstance };

