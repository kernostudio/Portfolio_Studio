"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchUserProfile,
  updateUserProfile,
  UserData,
} from "./authapi";
import { ToastContainer } from "react-toastify";

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
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // 👈 added this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (typeof window === "undefined") return;

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      try {
        const tokenCookie = document.cookie
          .split("; ")
          .find((c) => c.startsWith("accessToken="));

        if (tokenCookie) {
          const response = await fetchUserProfile();
          if (response.data?.user) {
            const profileUser: User = {
              id: response.data.user.id,
              name: response.data.user.fullName,
              email: response.data.user.email,
              role: response.data.user.role, // ✅ ensure role is set
              avatarUrl: response.data.user.avatarUrl,
            };
            setUser(profileUser);
            localStorage.setItem("user", JSON.stringify(profileUser));
          }
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const register = async (userData: UserData) => {
    const response = await registerUser(userData);
    const newUser: User = {
      id: response.data.userId,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  };

  const login = async (userData: UserData) => {
    const response = await loginUser(userData);
    const profileResponse = await fetchUserProfile();
    const loggedInUser: User = {
      id: response.data.userId,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      avatarUrl: profileResponse.data.user.avatarUrl,
    };
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    return loggedInUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
