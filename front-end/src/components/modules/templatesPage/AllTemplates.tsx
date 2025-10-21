"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosPublic from "@/hooks/axiosPublic";

import { useAuth } from "@/Auth/AuthContext";
import TemplatesFilter from "./TemplateFilter";
import TemplateCard from "./TemplateCard";
import TemplateCardSkeleton from "./TemplateCardSkeleton";

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

  return (
    <div className="w-11/12 mx-auto mt-10 pb-10">
      <TemplatesFilter onFilterChange={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* --- Loading Skeletons --- */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <TemplateCardSkeleton key={i} />
          ))}

        {/* --- Error Message --- */}
        {isError && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-600">Failed to load templates.</p>
          </div>
        )}

        {/* --- No Templates --- */}
        {!isLoading && templates.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p>No templates found.</p>
          </div>
        )}

        {/* --- Template Cards with smooth animation --- */}
        <AnimatePresence>
          {!isLoading &&
            templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <TemplateCard template={template} user={user} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
