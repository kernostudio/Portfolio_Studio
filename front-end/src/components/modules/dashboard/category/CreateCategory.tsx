/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import UseAxiosPublic from "@/hooks/axiosPublic";
import { useMutation } from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent } from "react";
import { FiPlusCircle } from "react-icons/fi";
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
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
      <div className="w-full md:w-8/12 lg:w-6/12 bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-2 mb-6">
          <FiPlusCircle className="text-indigo-600 text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Category
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              placeholder="Enter category name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a short description (optional)"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={createCategoryMutation.isPending}
            className="w-full flex items-center justify-center gap-2 border-2 bg-purple-800 text-white font-medium py-2.5 rounded-lg transition-all duration-300 hover:bg-indigo-700 shadow-md disabled:opacity-70"
          >
            <FiPlusCircle />{" "}
            {createCategoryMutation.isPending
              ? "Creating..."
              : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
