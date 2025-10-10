/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useRouter } from "next/navigation";

export default function MyTemplates({ id }: { id: string }) {
  const axiosPublic = UseAxiosPublic();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTemplates", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user-templates/${id}`);
      return res.data?.data; // Adjust if backend wraps data differently
    },
    enabled: !!id,
  });

  const handleLiveLink = (userId: string, templateId: string) => {
    // Navigate to the live template route
    router.push(`/user-template/${userId}/${templateId}`);
  };

  if (isLoading) return <p>Loading templates...</p>;
  if (isError) return <p>No template available</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data && data.length > 0 ? (
        data.map((template: any) => (
          <div
            key={template.id}
            className="border rounded-lg shadow p-4 bg-white hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">
              {template.template?.title || "Untitled Template"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Template ID: {template.id}
            </p>

            <button
              onClick={() => handleLiveLink(id, template.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Live Preview
            </button>
          </div>
        ))
      ) : (
        <p>No templates found for this user.</p>
      )}
    </div>
  );
}
