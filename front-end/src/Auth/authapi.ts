import axios from "axios";
import { API_BASE_URL } from "../utils/config";

export interface UserData {
  email: string;
  password: string;
  fullName?: string;
}

// Register user
export const registerUser = async (userData: UserData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
    withCredentials: true, // important for sending cookies
  });
  return response.data;
};

// Login user
export const loginUser = async (userData: UserData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
    withCredentials: true,
  });
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

// Fetch current logged-in user profile
export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
    withCredentials: true,
  });
  return response.data;
};

// Update user profile
export const updateUserProfile = async (formData: FormData) => {
  const response = await axios.patch(`${API_BASE_URL}/auth/profile`, formData, {
    withCredentials: true,
  });
  return response.data;
};
