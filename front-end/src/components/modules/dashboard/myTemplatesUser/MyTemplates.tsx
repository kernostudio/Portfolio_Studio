/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useRouter } from "next/navigation";
import {
  Eye,
  Trash2,
  Edit3,
  Globe,
  Loader2,
  FileText,
  Calendar,
  ArrowUpDown,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuth } from "@/Auth/AuthContext";
import Image from "next/image";

interface UserTemplate {
  id: string;
  userId: string;
  templateId: string;
  filledValues: any;
  sectionsData?: any;
  createdAt: string;
  updatedAt: string;
  template: {
    id: string;
    title: string;
    description?: string;
    categoryId: string;
    slug: string;
    templateImgUrl: string;
    previewUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  publishRequests?: Array<{
    id: string;
    status: "pending" | "approved" | "rejected";
    domainType: string;
    domain?: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export default function MyTemplates({ id }: { id: string }) {
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userTemplates", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user-templates/${id}`);
      console.log("Full API Response:", res.data);

      const responseData = res.data?.data;

      // If it's a single object, wrap it in an array
      if (responseData && !Array.isArray(responseData)) {
        return [responseData];
      }

      // If it's already an array, return it
      return responseData || [];
    },
    enabled: !!id,
  });

  const handlePreview = (templateId: string) => {
    router.push(`/user-template/${id}/${templateId}`);
  };

  const handleDelete = async (templateId: string, templateTitle: string) => {
    const result = await Swal.fire({
      title: "Delete Template?",
      html: `
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-900 mb-2">"${templateTitle}"</p>
          <p class="text-gray-600">This action cannot be undone and the template will be permanently deleted.</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
      customClass: {
        confirmButton: "px-6 py-3 rounded-lg font-medium",
        cancelButton: "px-6 py-3 rounded-lg font-medium",
      },
    });

    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(
          `/api/user-templates/${user?.id}/${templateId}`
        );
        toast.success("Template deleted successfully!");
        refetch();
      } catch {
        toast.error("Failed to delete template.");
      }
    }
  };

  const handleUpdate = (templateId: string) => {
    router.push(`/edit-user-owned-template/${templateId}`);
  };

  const handlePublish = async (templateId: string, templateTitle: string) => {
    const { value: formValues } = await Swal.fire({
      title: "Publish Template",
      html: `
        <div class="text-left">
          <p class="text-sm text-gray-600 mb-4">Publish "<span class="font-semibold">${templateTitle}</span>" to make it live</p>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Domain Type</label>
            <select id="domainType" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="subdomain">Subdomain (e.g. myname.yoursite.com)</option>
              <option value="custom">Custom Domain (e.g. example.com)</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Domain Name</label>
            <input 
              id="domain" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter subdomain or domain"
            />
          </div>
        
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const domainType = (
          document.getElementById("domainType") as HTMLSelectElement
        ).value;
        const domain = (
          document.getElementById("domain") as HTMLInputElement
        ).value?.trim();
        const note = (
          document.getElementById("note") as HTMLTextAreaElement
        ).value?.trim();
        if (!domain) {
          Swal.showValidationMessage("Please enter a domain name");
        }
        return { domainType, domain, note };
      },
      showCancelButton: true,
      confirmButtonText: "Submit for Review",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "px-6 py-3 rounded-lg font-medium",
        cancelButton: "px-6 py-3 rounded-lg font-medium",
      },
    });

    if (!formValues) return;

    const payload = {
      domainType: formValues.domainType,
      domain: formValues.domain,
      note: formValues.note,
      userTemplateId: templateId,
    };

    try {
      await axiosPublic.post(`/api/user-templatesPublish`, payload);
      toast.success("Publish request submitted! Admin will review it.");
      refetch();
    } catch (err) {
      console.error("Publish request failed", err);
      toast.error("Failed to submit publish request.");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mobile Card View
  const MobileTemplateCard = ({ template }: { template: UserTemplate }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* Template Image and Header */}
        <div className="flex gap-3 mb-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden flex-shrink-0 border">
            {template.template?.templateImgUrl ? (
              <Image
                src={template.template.templateImgUrl}
                alt={template.template?.title || "Template"}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-sm">
              {template.template?.title || "Untitled Template"}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Updated {formatDate(template.updatedAt)}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === template.id ? null : template.id
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {activeDropdown === template.id && (
              <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48 py-1">
                <button
                  onClick={() => {
                    handlePreview(template.id);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => {
                    handleUpdate(template.id);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    handlePublish(
                      template.id,
                      template.template?.title || "Template"
                    );
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Publish
                </button>
                <button
                  onClick={() => {
                    handleDelete(
                      template.id,
                      template.template?.title || "Template"
                    );
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between border-t pt-3">
          <button
            onClick={() => handlePreview(template.id)}
            className="flex items-center gap-2 px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-3 h-3" />
            View
          </button>
          <button
            onClick={() => handleUpdate(template.id)}
            className="flex items-center gap-2 px-3 py-2 text-xs text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={() =>
              handlePublish(template.id, template.template?.title || "Template")
            }
            className="flex items-center gap-2 px-3 py-2 text-xs text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Globe className="w-3 h-3" />
            Publish
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading your templates...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center min-h-screen py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          Failed to load ,templates not found
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Convert single object to array for mapping
  const templates = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Templates</h1>
          <p className="text-gray-600 mt-2">
            Manage and publish your created templates
          </p>
          <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Templates
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.length > 0 ? (
                  templates.map((template: UserTemplate) => (
                    <tr
                      key={template.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden flex-shrink-0 border">
                            {template.template?.templateImgUrl ? (
                              <Image
                                src={template.template.templateImgUrl}
                                alt={template.template?.title || "Template"}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {template.template?.title || "Untitled Template"}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(template.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(template.updatedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handlePreview(template.id)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdate(template.id)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handlePublish(
                                template.id,
                                template.template?.title || "Template"
                              )
                            }
                            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Publish"
                          >
                            <Globe className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(
                                template.id,
                                template.template?.title || "Template"
                              )
                            }
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">
                          No templates found
                        </p>
                        <p className="text-gray-400 mt-2">
                          Create your first template to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet View */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.length > 0 ? (
              templates.map((template: UserTemplate) => (
                <MobileTemplateCard key={template.id} template={template} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No templates found</p>
                <p className="text-gray-400 mt-2">
                  Create your first template to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
