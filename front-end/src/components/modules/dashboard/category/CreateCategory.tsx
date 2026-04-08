/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import UseAxiosPublic from "@/hooks/axiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent } from "react";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface CategoryFormData {
  name: string;
  description?: string;
}

export default function CreateCategoryForm() {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });

  const axiosPublic = UseAxiosPublic();

  const createCategoryMutation = useMutation({
    mutationFn: async (newCategory: CategoryFormData) => {
      const res = await axiosPublic.post("/api/categories", newCategory);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Category created successfully!");
      setFormData({ name: "", description: "" });
    },
    onError: (error: any) => {
      // ✅ Extract meaningful backend message
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      toast.error(message);
      console.error("Error creating category:", error.response?.data);
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategoryMutation.mutate(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)] px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add a new template category
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Business Cards, Social Media"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black outline-none transition-all bg-gray-50 placeholder-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what this category is used for..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black outline-none resize-none transition-all bg-gray-50 placeholder-gray-400"
            ></textarea>
            <p className="text-xs text-gray-500 mt-2">
              Optional: Help users understand this category&apos;s purpose
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createCategoryMutation.isPending}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-700 to-black text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {createCategoryMutation.isPending ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
