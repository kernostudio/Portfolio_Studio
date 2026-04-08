"use client";
import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Globe,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface Template {
  id: string;
  title: string;
  templateImgUrl: string;
}

interface UserTemplate {
  id: string;
  template: Template;
}

interface PublishRequest {
  id: string;
  userTemplateId: string;
  domainType: string;
  domain?: string;
  note?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  userTemplate: UserTemplate;
}

export default function MyPublishRequest() {
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();

  const {
    data: publishRequests,
    isLoading,
    error,
  } = useQuery<PublishRequest[]>({
    queryKey: ["myPublishRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user-templatesPublish/user/all`);
      return res.data.data;
    },
    enabled: !!user,
  });

  const getStatusConfig = (status: string) => {
    const config = {
      pending: {
        icon: Clock,
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        label: "Under Review",
        description: "Your request is being reviewed by our team",
      },
      approved: {
        icon: CheckCircle,
        color: "text-green-600 bg-green-50 border-green-200",
        label: "Approved",
        description: "Your template has been published successfully",
      },
      rejected: {
        icon: XCircle,
        color: "text-red-600 bg-red-50 border-red-200",
        label: "Rejected",
        description: "Your request needs some adjustments",
      },
    };
    return config[status as keyof typeof config] || config.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your publish requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Requests
          </h3>
          <p className="text-gray-600">
            Unable to load your publish requests. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Publish Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Track the status of your template publication requests
        </p>
      </div>

      {/* Empty State */}
      {!publishRequests || publishRequests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Publish Requests
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            You haven&#39;t submitted any templates for publication yet. Start
            by creating and submitting a template.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {publishRequests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left Section - Template Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <img
                          src={request.userTemplate.template.templateImgUrl}
                          alt={request.userTemplate.template.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {request.userTemplate.template.title}
                          </h3>

                          {/* Domain Information */}
                          <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Globe className="h-4 w-4" />
                              <span className="font-medium">Type:</span>
                              <span className="capitalize">
                                {request.domainType}
                              </span>
                            </div>
                            {request.domain && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <ExternalLink className="h-4 w-4" />
                                <span className="font-medium">Domain:</span>
                                <span className="text-indigo-600">
                                  {request.domain}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Note */}
                          {request.note && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm text-blue-800">
                                <span className="font-semibold">
                                  Your Note:
                                </span>{" "}
                                {request.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Status & Dates */}
                    <div className="lg:text-right space-y-3">
                      {/* Status Badge */}
                      <div className="flex lg:justify-end">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.color}`}
                        >
                          <StatusIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>

                      {/* Status Description */}
                      <p className="text-sm text-gray-600 max-w-xs lg:max-w-none">
                        {statusConfig.description}
                      </p>

                      {/* Dates */}
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>
                          <span className="font-medium">Submitted:</span>{" "}
                          {formatDate(request.createdAt)}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>{" "}
                          {formatDate(request.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-100">
                  <div
                    className={`h-full transition-all duration-500 ${
                      request.status === "approved"
                        ? "bg-green-500 w-full"
                        : request.status === "rejected"
                        ? "bg-red-500 w-full"
                        : "bg-yellow-500 w-2/3"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats Summary */}
      {publishRequests && publishRequests.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {publishRequests.filter((req) => req.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                publishRequests.filter((req) => req.status === "approved")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                publishRequests.filter((req) => req.status === "rejected")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>
      )}
    </div>
  );
}
