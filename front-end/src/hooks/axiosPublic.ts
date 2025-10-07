import axios, { AxiosInstance } from "axios";
const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const UseAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export default UseAxiosPublic;
