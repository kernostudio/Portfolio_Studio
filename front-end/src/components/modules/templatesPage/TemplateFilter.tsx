"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Category {
  id: string;
  name: string;
}

interface TemplatesFilterProps {
  onFilterChange: (filters: { search: string; category: string }) => void;
}

export default function TemplatesFilter({
  onFilterChange,
}: TemplatesFilterProps) {
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
    <div className="w-full p-6  mb-6">
      {/* Search Field */}
      <div className="flex justify-center">
        <div className="mb-6 lg:w-1/2 w-full ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaMagnifyingGlass className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories as Buttons */}
      <div>
        <h2 className="font-medium text-sm mb-3 text-gray-700">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {/* All Category Button */}
          <button
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCategory === "All"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          {/* Category Buttons */}
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full border border-gray-300 bg-gray-200 animate-pulse"
                >
                  <div className="w-12 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
