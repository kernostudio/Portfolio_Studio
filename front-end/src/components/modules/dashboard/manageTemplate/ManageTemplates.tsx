"use client";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FiTrash2,
  FiEye,
  FiImage,
  FiCalendar,
  FiSearch,
  FiPlus,
} from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Template {
  id: string;
  title: string;
  description?: string;
  templateImgUrl: string;
  category: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
  slug: string;
}

interface TemplateResponse {
  total: number;
  page: number;
  template: Template[];
}

export default function ManageTemplates() {
  const axiosPublic = UseAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery<TemplateResponse>({
    queryKey: ["templates"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/admin/templates");
      return res.data.data;
    },
  });
  const handleClick = () => {
    router.push(`/dashboard/create-template`);
  };
  const handlePreviewClick = (id: string) => {
    router.push(`/templateDetails/${id}`);
  };
  const deleteMutation = useMutation({
    mutationFn: async (templateId: string) => {
      await axiosPublic.delete(`/api/admin/templates/${templateId}`);
    },
    onSuccess: () => {
      //   toast.success("Template deleted successfully!");
      refetch();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete template");
    },
  });

  const handleDelete = async (templateId: string, templateTitle: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${templateTitle}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#fff",
      iconColor: "#e53e3e",
      customClass: {
        confirmButton: "px-4 py-2 rounded-lg font-medium",
        cancelButton: "px-4 py-2 rounded-lg font-medium",
      },
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(templateId);

      // Show success message after deletion starts
      Swal.fire({
        title: "Deleted!",
        text: `"${templateTitle}" has been deleted successfully.`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Filter templates based on search
  const filteredTemplates =
    data?.template?.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
          <span className="text-gray-600">Loading templates...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium">
            Failed to load templates
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Templates
          </h1>
          <p className="text-gray-600">
            View and manage all templates in your library
          </p>
        </div>

        {/* Stats Card - Only Total Templates */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Templates
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {data?.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiImage className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => handleClick()}
              className="bg-black hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              New Template
            </button>
          </div>
        </div>

        {/* Templates Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTemplates.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FiImage className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="text-lg font-medium">
                          No templates found
                        </p>
                        <p className="text-sm mt-1">
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Get started by creating your first template"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTemplates.map((template) => (
                    <tr
                      key={template.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden mr-4">
                            {template.templateImgUrl ? (
                              <img
                                src={template.templateImgUrl}
                                alt={template.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <FiImage className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {template.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                              {template.description ||
                                "No description available"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {template.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FiCalendar className="w-4 h-4 text-gray-400" />
                          {formatDate(template.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePreviewClick(template.id)}
                            className="text-black hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="View Template"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(template.id, template.title)
                            }
                            disabled={deleteMutation.isPending}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Template"
                          >
                            {deleteMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <FiTrash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {data && data.total > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredTemplates.length}</span> of{" "}
              <span className="font-medium">{data.total}</span> templates
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
