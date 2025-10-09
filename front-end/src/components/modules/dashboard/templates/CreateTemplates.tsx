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
  slug: string;
  placeholders: string; // JSON as string
  templateImg?: File;
  previewUrl?: string;
}

export default function CreateTemplateForm() {
  const [formData, setFormData] = useState<TemplateFormData>({
    title: "",
    description: "",
    categoryId: "",
    placeholders: "",
    slug: "",
    templateImg: undefined,
    previewUrl: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    mutationFn: async (fd: FormData) => {
      const res = await axiosPublic.post("/api/admin/templates", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Template created successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        categoryId: "",
        slug: "",
        placeholders: "",
        templateImg: undefined,
        previewUrl: "",
      });
      setImagePreview(null);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, templateImg: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.categoryId) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      // Parse JSON safely
      const parsedPlaceholders = formData.placeholders
        ? JSON.parse(formData.placeholders)
        : {};

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description || "");
      fd.append("categoryId", formData.categoryId);
      fd.append("slug", formData.slug);
      fd.append("placeholders", JSON.stringify(parsedPlaceholders)); // backend should parse this
      fd.append("previewUrl", formData.previewUrl || "");

      if (formData.templateImg) {
        fd.append("file", formData.templateImg); // must match Multer field name
      }

      createTemplateMutation.mutate(fd);
    } catch {
      toast.error("Invalid JSON in placeholders!");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-120px)] px-4">
      <div className="w-full md:w-8/12 lg:w-8/12 xl:w-6/12 bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-2 mb-6">
          <FiFilePlus className="text-indigo-600 text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Template
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter template title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          {/* slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Enter template slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter short description (optional)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
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

          {/* Placeholders */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholders (JSON)
            </label>
            <textarea
              name="placeholders"
              value={formData.placeholders}
              onChange={handleChange}
              placeholder='e.g. { "root": { "bgColor": "#ffffff" } }'
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono"
            />
          </div>

          {/* Template Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border-gray-300 rounded-lg border-2 p-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Preview URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview URL
            </label>
            <input
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
