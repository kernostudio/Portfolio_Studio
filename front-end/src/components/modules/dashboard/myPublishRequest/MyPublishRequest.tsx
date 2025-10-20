"use client";
import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function MyPublishRequest() {
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();

  const { data, isLoading, error } = useQuery({
    queryKey: ["myPublishRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user-templatesPublish/user/all`);
      return res.data.data;
    },
    enabled: !!user, // waits until user is loaded
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading publish requests</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Publish Requests</h2>
      {data?.length === 0 && <p>No publish requests yet.</p>}
      <div className="grid gap-4">
        {data?.map((req) => (
          <div key={req.id} className="p-4 border rounded-lg shadow-sm">
            <p>
              <strong>Template:</strong> {req.userTemplate?.template?.title}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
            <p>
              <strong>Domain:</strong> {req.domain || "N/A"}
            </p>
            <p>
              <strong>Domain Type:</strong> {req.domainType}
            </p>
            <p>
              <strong>Note:</strong> {req.note || "No note"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
