/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/Auth/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard/profile";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      router.replace(redirectTo);
    }
  }, [user, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      toast.success("Welcome back! Sign in successful!");
      router.push(redirectTo);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9fbff] to-[#e3f3ff] px-4 py-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-6 animate-fade-in">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">PS</span>
            </div>
            <h1 className="text-3xl font-bold text-black">Portfolio Studio</h1>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
            Browse Stunning Templates
          </h2>

          <p className="text-xl text-gray-800 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Discover beautiful templates by category, customize with simple
            edits, and publish with one click. No coding or design skills
            required.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
            <div className="flex items-center gap-2 text-gray-800">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span>Professional Designs</span>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span>Easy Customization</span>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span>One-Click Publishing</span>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/50 animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411M9.88 9.88l3.413-3.412"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/templates/signup"
                  className="font-semibold text-black hover:text-gray-800 transition-colors duration-200 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}
