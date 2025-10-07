/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useAxiosPublic from "@/hooks/axiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent } from "react";
import { FiFilePlus } from "react-icons/fi";
import { toast } from "react-toastify";

interface Category {
  id: string;
  name: string;
}

interface TemplateFormData {
  title: string;
  description?: string;
  categoryId: string;
  html: string;
  placeholders: string;
  sections: string;
  previewUrl?: string;
}

export default function CreateTemplateForm() {
  const [formData, setFormData] = useState<TemplateFormData>({
    title: "",
    description: "",
    categoryId: "",
    html: "",
    placeholders: "",
    sections: "",
    previewUrl: "",
  });

  const axiosPublic = useAxiosPublic();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/categories");
      return res.data.data as Category[];
    },
  });

  const createTemplateMutation = useMutation({
    mutationFn: async (newTemplate: TemplateFormData) => {
      const res = await axiosPublic.post("/api/admin/templates", newTemplate);
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Template created successfully!");
      // Reset form after success
      setFormData({
        title: "",
        description: "",
        categoryId: "",
        html: "",
        placeholders: "",
        sections: "",
        previewUrl: "",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "❌ Failed to create template!";
      toast.error(message);
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.categoryId || !formData.html) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const preparedData = {
        ...formData,
        placeholders: formData.placeholders
          ? JSON.parse(formData.placeholders)
          : {},
        sections: formData.sections ? JSON.parse(formData.sections) : {},
      };
      createTemplateMutation.mutate(preparedData);
    } catch {
      toast.error("Invalid JSON in placeholders or sections!");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-120px)] px-4">
      <div className="w-full md:w-8/12 lg:w-8/12 xl:w-6/12 bg-white rounded-2xl shadow-md p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FiFilePlus className="text-indigo-600 text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Template
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter template title"
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
              placeholder="Enter short description (optional)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="">Select a category</option>
              {isLoading ? (
                <option disabled>Loading...</option>
              ) : isError ? (
                <option disabled>Error loading categories</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* HTML */}
          <div>
            <label
              htmlFor="html"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              HTML Code <span className="text-red-500">*</span>
            </label>
            <textarea
              id="html"
              name="html"
              value={formData.html}
              onChange={handleChange}
              required
              placeholder="<div>Your HTML here</div>"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono"
            ></textarea>
          </div>

          {/* Placeholders */}
          <div>
            <label
              htmlFor="placeholders"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Placeholders (JSON)
            </label>
            <textarea
              id="placeholders"
              name="placeholders"
              value={formData.placeholders}
              onChange={handleChange}
              placeholder='e.g. { "name": "John", "email": "john@example.com" }'
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono"
            ></textarea>
          </div>

          {/* Sections */}
          <div>
            <label
              htmlFor="sections"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sections (JSON)
            </label>
            <textarea
              id="sections"
              name="sections"
              value={formData.sections}
              onChange={handleChange}
              placeholder='e.g. { "header": "Welcome", "footer": "Thanks" }'
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono"
            ></textarea>
          </div>

          {/* Preview URL */}
          <div>
            <label
              htmlFor="previewUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preview URL
            </label>
            <input
              id="previewUrl"
              name="previewUrl"
              type="text"
              value={formData.previewUrl}
              onChange={handleChange}
              placeholder="https://example.com/preview"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={createTemplateMutation.isPending}
            className="w-full flex items-center justify-center gap-2 border-2 bg-purple-800 text-white font-medium py-2.5 rounded-lg transition-all duration-300 hover:bg-indigo-700 shadow-md disabled:opacity-60"
          >
            <FiFilePlus />{" "}
            {createTemplateMutation.isPending
              ? "Creating..."
              : "Create Template"}
          </button>
        </form>
      </div>
    </div>
  );
}
