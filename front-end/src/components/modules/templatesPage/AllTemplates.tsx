/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // import useRouter
import useAxiosPublic from "@/hooks/axiosPublic";
import TemplatesSidebar from "./TemplateSideBar";
import Image from "next/image";
import { useAuth } from "@/Auth/AuthContext";

interface Template {
  id: string;
  title: string;
  description?: string;
  templateImgUrl?: string;
  category: { id: string; name: string };
}

interface TemplateResponse {
  total: number;
  page: number;
  template: Template[];
}

export default function AllTemplates() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const router = useRouter(); // initialize router

  const [filters, setFilters] = useState({
    search: "",
    category: "", // empty string = "All"
  });

  const { data, isLoading, isError } = useQuery<TemplateResponse, Error>({
    queryKey: ["templates", filters],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/admin/templates", {
        params: {
          page: 1,
          limit: 9,
          search: filters.search,
          category: filters.category || undefined,
        },
      });
      return res.data.data as TemplateResponse;
    },
  });

  const templates = data?.template ?? [];

  const handleCardClick = (id: string) => {
    router.push(`/templateDetails/${id}`); // navigate to template details page
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-11/12 mx-auto mt-10 mb-10">
      <TemplatesSidebar onFilterChange={setFilters} />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <p>Loading templates...</p>}
        {isError && <p>Failed to load templates.</p>}
        {!isLoading && templates.length === 0 && <p>No templates found.</p>}

        {templates.map((template: any) => (
          <div
            key={template.id}
            className="p-4 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition"
          >
            {template.templateImgUrl && (
              <div className="w-full h-40 relative mb-4 rounded-xl overflow-hidden">
                <Image
                  src={template.templateImgUrl}
                  alt={template.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-lg font-semibold">{template.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {template.category?.name || "Uncategorized"}
            </p>
            <p className="text-gray-600 text-sm">{template.description}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleCardClick(template.id)}
                className="bg-indigo-600 text-sm text-white px-3 py-2 rounded hover:bg-indigo-700 transition"
              >
                Preview
              </button>

              <button
                onClick={() =>
                  user
                    ? router.push(`/templateCustomize/${template.id}`) // logged in, go to edit
                    : router.push(
                        `/templates/signin?redirectTo=/templateCustomize/${template.id}`
                      )
                }
                className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition"
              >
                Edit Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
