/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/hooks/axiosPublic";

import Image from "next/image";
import { useAuth } from "@/Auth/AuthContext";
import TemplatesFilter from "./TemplateFilter";
import TemplateCard from "./TemplateCard";

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
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
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
    router.push(`/templateDetails/${id}`);
  };

  return (
    <div className="w-11/12 mx-auto mt-10   pb-10">
      {/* Filter Card at Top */}
      <TemplatesFilter onFilterChange={setFilters} />

      {/* Templates Grid */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="col-span-full text-center py-8">
            <p>Loading templates...</p>
          </div>
        )}
        {isError && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-600">Failed to load templates.</p>
          </div>
        )}
        {!isLoading && templates.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p>No templates found.</p>
          </div>
        )}

        {templates.map((template: any) => (
          <TemplateCard
            template={template}
            key={template.id}
            user={user}
          ></TemplateCard>
        ))}
      </div>
    </div>
  );
}
