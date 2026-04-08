import axios, { AxiosInstance } from "axios";
const axiosPublic = axios.create({
  // baseURL: "https://portfoliostudio-theta.vercel.app",
  baseURL: "http://localhost:5001",
  withCredentials: true,
});
const UseAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export default UseAxiosPublic;
