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
} from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuth } from "@/Auth/AuthContext";

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
      console.log("API Response:", res.data); // Debug log

      // Handle both array and single object responses
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

  const handleDelete = async (templateId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
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

  // inside your React component (MyTemplates or ProductDesignerEdit)
  const handlePublish = async (templateId: string) => {
    const { value: formValues } = await Swal.fire({
      title: "Publish template",
      html:
        `<p class="text-sm text-gray-600 mb-2">Choose domain type and provide a domain or subdomain</p>` +
        `<select id="domainType" class="swal2-input">
         <option value="subdomain">Subdomain (e.g. myname)</option>
         <option value="custom">Custom domain (e.g. example.com)</option>
       </select>` +
        `<input id="domain" class="swal2-input" placeholder="subdomain or domain" />` +
        `<textarea id="note" class="swal2-textarea" placeholder="Optional note (e.g. prefer https)"></textarea>`,
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
          Swal.showValidationMessage("Please enter a subdomain or domain");
        }
        return { domainType, domain, note };
      },
      showCancelButton: true,
    });

    if (!formValues) return;

    const payload = {
      domainType: formValues.domainType, // 'subdomain' | 'custom'
      domain: formValues.domain,
      note: formValues.note,
    };

    try {
      await axiosPublic.post(`/api/user-templatesPublish`, payload);
      toast.success("Publish request submitted! Admin will review it.");
      refetch(); // refresh list so publishRequests shows up
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

  const getPublishStatus = (template: UserTemplate) => {
    // If no publish requests, it's a draft
    if (!template.publishRequests || template.publishRequests.length === 0) {
      return {
        status: "draft",
        label: "Draft",
        color: "bg-gray-100 text-gray-800 border border-gray-300",
      };
    }

    // Get the latest publish request
    const latestRequest = template.publishRequests.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt)
        ? current
        : latest;
    });

    const statusConfig = {
      pending: {
        label: "Pending Review",
        color: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      },
      approved: {
        label: "Published",
        color: "bg-green-100 text-green-800 border border-green-300",
      },
      rejected: {
        label: "Rejected",
        color: "bg-red-100 text-red-800 border border-red-300",
      },
    };

    const config = statusConfig[
      latestRequest.status as keyof typeof statusConfig
    ] || {
      label: latestRequest.status,
      color: "bg-gray-100 text-gray-800 border border-gray-300",
    };

    return {
      status: latestRequest.status,
      ...config,
    };
  };

  // Mobile Card View
  const MobileTemplateCard = ({ template }: { template: UserTemplate }) => {
    const publishStatus = getPublishStatus(template);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {template.template?.title || "Untitled Template"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              ID: {template.id.slice(0, 8)}...
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === template.id ? null : template.id
                )
              }
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {activeDropdown === template.id && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48 py-1">
                <button
                  onClick={() => {
                    handlePreview(template.id);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => {
                    handleUpdate(template.id);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    handlePublish(template.id);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Globe className="w-4 h-4" />
                  {publishStatus.status === "approved" ? "Manage" : "Publish"}
                </button>
                <button
                  onClick={() => {
                    handleDelete(template.id);
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${publishStatus.color}`}
          >
            {publishStatus.label}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(template.updatedAt)}
          </div>
        </div>

        {/* Quick Actions - Visible on mobile */}
        <div className="flex justify-between border-t pt-3">
          <button
            onClick={() => handlePreview(template.id)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => handleUpdate(template.id)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => handlePublish(template.id)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded"
          >
            <Globe className="w-4 h-4" />
            {publishStatus.status === "approved" ? "Manage" : "Publish"}
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading templates...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No templates available</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first template to get started
        </p>
      </div>
    );
  }

  // Convert single object to array for mapping
  const templates = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="bg-white rounded-lg border mt-16 lg:mt-5 border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 bg-gray-50 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              My Templates
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {templates.length} template{templates.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Template Name
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Created At
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Last Modified
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templates.length > 0 ? (
              templates.map((template: UserTemplate) => {
                const publishStatus = getPublishStatus(template);

                return (
                  <tr
                    key={template.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {template.template?.title || "Untitled Template"}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {template.id.slice(0, 8)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${publishStatus.color}`}
                      >
                        {publishStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(template.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(template.updatedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePreview(template.id)}
                          className="flex items-center gap-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUpdate(template.id)}
                          className="flex items-center gap-1 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePublish(template.id)}
                          className="flex items-center gap-1 p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title={
                            publishStatus.status === "approved"
                              ? "Manage Publishing"
                              : "Publish"
                          }
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="flex items-center gap-1 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No templates found for this user.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Create your first template to get started
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tablet View - Cards with more compact layout */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-1 gap-4 p-4">
          {templates.length > 0 ? (
            templates.map((template: UserTemplate) => {
              const publishStatus = getPublishStatus(template);

              return (
                <div
                  key={template.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {template.template?.title || "Untitled Template"}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {template.id.slice(0, 8)}...
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${publishStatus.color}`}
                    >
                      {publishStatus.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Created: {formatDate(template.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Updated: {formatDate(template.updatedAt)}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 border-t pt-3">
                    <button
                      onClick={() => handlePreview(template.id)}
                      className="flex items-center gap-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUpdate(template.id)}
                      className="flex items-center gap-1 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePublish(template.id)}
                      className="flex items-center gap-1 p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                      title={
                        publishStatus.status === "approved"
                          ? "Manage Publishing"
                          : "Publish"
                      }
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="flex items-center gap-1 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No templates found for this user.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden">
        <div className="p-4 space-y-4">
          {templates.length > 0 ? (
            templates.map((template: UserTemplate) => (
              <MobileTemplateCard key={template.id} template={template} />
            ))
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No templates found for this user.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
