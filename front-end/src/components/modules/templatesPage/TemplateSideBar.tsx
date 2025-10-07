"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface TemplatesSidebarProps {
  onFilterChange: (filters: { search: string; category: string }) => void;
}

export default function TemplatesSidebar({
  onFilterChange,
}: TemplatesSidebarProps) {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/categories");
      return res.data.data;
    },
  });

  // Update filters whenever search or category changes
  useEffect(() => {
    onFilterChange({
      search,
      category: selectedCategory === "All" ? "" : selectedCategory,
    });
  }, [search, selectedCategory, onFilterChange]);

  return (
    <div className="w-full md:w-[320px] p-5 bg-white border-2 border-gray-200 rounded-2xl h-auto md:h-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <img
          className="w-6"
          src="https://img.icons8.com/?size=100&id=3004&format=png&color=000000"
          alt="filter"
        />
        <h1 className="font-semibold text-xl">Filters</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <h2 className="font-medium text-sm mb-2">Search</h2>
        <input
          type="text"
          placeholder="Search Templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="font-medium text-sm mb-2">Category</h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer px-3 py-1 rounded ${
              selectedCategory === "All"
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </li>
          {isLoading ? (
            <li>Loading...</li>
          ) : (
            categories.map((cat) => (
              <li
                key={cat.id}
                className={`cursor-pointer px-3 py-1 rounded ${
                  selectedCategory === cat.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
