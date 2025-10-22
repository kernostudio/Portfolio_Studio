/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useAxiosPublic from "@/hooks/axiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent } from "react";
import { FiFilePlus, FiUpload } from "react-icons/fi";
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
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-120px)] px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create Template
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Design your perfect template
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Slug in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter template title"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black outline-none transition-all bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Enter template slug"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black  outline-none transition-all bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your template purpose and features..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black  outline-none resize-none transition-all bg-gray-50"
            />
          </div>

          {/* Category & Preview URL in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black  outline-none transition-all bg-gray-50 appearance-none"
              >
                <option value="">Choose category</option>
                {isLoading ? (
                  <option disabled>Loading categories...</option>
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

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Preview URL
              </label>
              <input
                name="previewUrl"
                type="text"
                value={formData.previewUrl}
                onChange={handleChange}
                placeholder="https://example.com/preview"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black  outline-none transition-all bg-gray-50"
              />
            </div>
          </div>

          {/* Placeholders */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Placeholders Configuration
            </label>
            <textarea
              name="placeholders"
              value={formData.placeholders}
              onChange={handleChange}
              placeholder='{"root": {"bgColor": "#ffffff"}, "header": {"text": "Your Header"}}'
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:border-black  outline-none resize-none font-mono text-sm bg-gray-50 transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter valid JSON format for template placeholders
            </p>
          </div>

          {/* Template Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Template Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-black transition-all bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="template-image"
              />
              <label htmlFor="template-image" className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center gap-2">
                  <FiUpload className="text-2xl text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload template image
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                </div>
              </label>
            </div>
            {imagePreview && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl border-2 border-indigo-200"
                />
                <span className="text-sm text-green-600 font-medium">
                  Image ready for upload
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createTemplateMutation.isPending}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-600 to-black text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:bg-gray-700 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {createTemplateMutation.isPending ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
