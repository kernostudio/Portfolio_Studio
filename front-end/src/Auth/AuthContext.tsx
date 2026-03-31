/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToastContainer } from "react-toastify";
import {
  fetchUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
  UserData,
} from "./authapi";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (userData: UserData) => Promise<User>;
  login: (userData: UserData) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<User>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Verify user by calling backend (which checks cookie validity) - FIXED
  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Don't check localStorage first - always verify with backend first
        const response = await fetchUserProfile();
        if (response === null) {
          setUser(null);
          localStorage.removeItem("user");
          return;
        }
        if (response.data?.user) {
          const profileUser: User = {
            id: response.data.user.id,
            name: response.data.user.fullName,
            email: response.data.user.email,
            role: response.data.user.role,
            avatarUrl: response.data.user.avatarUrl,
          };
          setUser(profileUser);
          localStorage.setItem("user", JSON.stringify(profileUser));
        } else {
          // If backend says no user, clear everything
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error: any) {
        console.error("Auth check failed:", error);
        // On ANY error, clear user state
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // ✅ Register new user
  const register = async (userData: UserData) => {
    const response = await registerUser(userData);
    // Attempt to fetch profile but handle cases where the cookie isn't ready yet
    const profileResponse = await fetchUserProfile().catch(() => null);

    const registeredUser: User = {
      id: response.data.userId,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      avatarUrl: profileResponse?.data?.user?.avatarUrl || "",
    };
    setUser(registeredUser);
    localStorage.setItem("user", JSON.stringify(registeredUser));
    return registeredUser;
  };

  // ✅ Login user (backend sets cookie)
  const login = async (userData: UserData) => {
    const response = await loginUser(userData);
    // Attempt to fetch profile but handle cases where the cookie isn't ready yet
    const profileResponse = await fetchUserProfile().catch(() => null);

    const loggedInUser: User = {
      id: response.data.userId,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      avatarUrl: profileResponse?.data?.user?.avatarUrl || "",
    };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    return loggedInUser;
  };

  // ✅ Logout user (clears cookie and localStorage)
  const logout = async () => {
    try {
      await logoutUser(); // calls backend to clear cookie
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      // Always clear frontend state regardless of API call success
      setUser(null);
      localStorage.removeItem("user");

      // Force a hard refresh to ensure all components reset
      window.location.href = "/";
    }
  };

  // ✅ Update user profile
  const updateProfile = async (formData: FormData) => {
    const response = await updateUserProfile(formData);
    const updatedUser: User = {
      id: response.data.user.id,
      name: response.data.user.fullName,
      email: response.data.user.email,
      role: response.data.user.role,
      avatarUrl: response.data.user.avatarUrl,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, updateProfile, setUser }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
