"use client";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface Template {
  id: string;
  title: string;
  templateImgUrl: string;
}

interface UserTemplate {
  id: string;
  user: User;
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

interface UpdateStatusData {
  status: "approved" | "rejected";
  note?: string;
}

export default function ManagePublishRequest() {
  const axiosPublic = UseAxiosPublic();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<PublishRequest | null>(
    null
  );
  const [updateNote, setUpdateNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all publish requests
  const {
    data: publishRequests,
    isLoading,
    error,
  } = useQuery<PublishRequest[]>({
    queryKey: ["publishRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/user-templatesPublish");
      return res.data.data;
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      note,
    }: { id: string } & UpdateStatusData) => {
      const res = await axiosPublic.patch(`/api/user-templatesPublish/${id}`, {
        status,
        note,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishRequests"] });
      toast.success("Status updated successfully");
      setIsModalOpen(false);
      setSelectedRequest(null);
      setUpdateNote("");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });

  const handleStatusUpdate = (status: "approved" | "rejected") => {
    if (!selectedRequest) return;

    updateStatusMutation.mutate({
      id: selectedRequest.id,
      status,
      note: updateNote.trim() || undefined,
    });
  };

  const openUpdateModal = (request: PublishRequest) => {
    setSelectedRequest(request);
    setUpdateNote("");
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${
          statusClasses[status as keyof typeof statusClasses]
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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

  if (isLoading) return <p className="text-center py-8">Loading...</p>;
  if (error)
    return <p className="text-center py-8 text-red-600">Error loading data</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Publish Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Review and manage template publish requests from users
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {!publishRequests || publishRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No publish requests found</p>
            <p className="text-gray-400 mt-2">
              There are no pending publish requests at the moment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User & Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domain Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {publishRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={request.userTemplate.template.templateImgUrl}
                            alt={request.userTemplate.template.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.userTemplate.template.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            by {request.userTemplate.user.fullName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {request.userTemplate.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Type:{" "}
                        <span className="font-medium">
                          {request.domainType}
                        </span>
                      </div>
                      {request.domain && (
                        <div className="text-sm text-gray-500">
                          Domain: {request.domain}
                        </div>
                      )}
                      {request.note && (
                        <div className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                          Note: {request.note}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Created: {formatDate(request.createdAt)}</div>
                      <div>Updated: {formatDate(request.updatedAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openUpdateModal(request)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Status Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-gray-50/60  flex items-center justify-center p-4 z-50">
          <div className="bg-white border shadow-2xl rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              Update Publish Status
            </h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Template:{" "}
                <span className="font-medium">
                  {selectedRequest.userTemplate.template.title}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                User:{" "}
                <span className="font-medium">
                  {selectedRequest.userTemplate.user.fullName}
                </span>
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="updateNote"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Admin Note (Optional)
              </label>
              <textarea
                id="updateNote"
                value={updateNote}
                onChange={(e) => setUpdateNote(e.target.value)}
                placeholder="Add any notes or feedback for the user..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRequest(null);
                  setUpdateNote("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                disabled={updateStatusMutation.isPending}
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={updateStatusMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
              >
                {updateStatusMutation.isPending ? "Updating..." : "Reject"}
              </button>
              <button
                onClick={() => handleStatusUpdate("approved")}
                disabled={updateStatusMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors disabled:opacity-50"
              >
                {updateStatusMutation.isPending ? "Updating..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
