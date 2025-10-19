"use client";
import React from "react";

export default function HowToCreate() {
  return (
    <div className="w-11/12 mx-auto mt-16">
      <h1 className="text-xl md:text-[40px] text-center">
        How to Create your <span className="font-bold">Portfolio</span>
      </h1>
      <div className="mt-16 flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="relative w-72 h-60 bg-white border-[#7f683f]  border rounded-2xl shadow-md flex flex-col justify-center items-center text-center p-6">
            {/* Top-left half border */}
            <div className="absolute top-0 left-0 w-28 h-28 border-t-4 border-l-4 border-[#7f683f] rounded-tl-2xl"></div>

            {/* Blue badge on top-right */}
            <div className="absolute -top-2 ml-64 bg-[#23a2fc] text-white text-sm font-semibold w-10 h-10 flex items-center justify-center rounded-md shadow">
              1
            </div>

            {/* Card Content */}
            <h2 className="text-lg font-semibold mt-6">Choose Template</h2>
            <p className="text-gray-500 text-sm mt-2">
              Select from our collection of professional, modern templates
              designed by experts.
            </p>
          </div>
          <div className="relative w-72 h-60 border-[#7f683f]  border  bg-white rounded-2xl shadow-md flex flex-col justify-center items-center text-center p-6">
            {/* Top-left half border */}
            <div className="absolute bottom-0 right-0 w-28 h-28 border-b-4 border-r-4 border-[#7f683f] rounded-br-2xl"></div>

            {/* Blue badge on top-right */}
            <div className="absolute -top-2 ml-64 bg-[#23a2fc] text-white text-sm font-semibold w-10 h-10 flex items-center justify-center rounded-md shadow">
              2
            </div>

            {/* Card Content */}
            <h2 className="text-lg font-semibold mt-6">Tap Tap Edit</h2>
            <p className="text-gray-500 text-sm mt-2">
              Add your personal details, work experience, education, and skills
              with our easy form.
            </p>
          </div>
          <div className="relative w-72 h-60 bg-white border-[#7f683f]  border rounded-2xl shadow-md flex flex-col justify-center items-center text-center p-6">
            {/* Top-left half border */}
            <div className="absolute top-0 left-0 w-28 h-28 border-t-4 border-l-4 border-[#7f683f] rounded-tl-2xl"></div>

            {/* Blue badge on top-right */}
            <div className="absolute -top-2 ml-64 bg-[#23a2fc] text-white text-sm font-semibold w-10 h-10 flex items-center justify-center rounded-md shadow">
              3
            </div>

            {/* Card Content */}
            <h2 className="text-lg font-semibold mt-6">1 Click Publish</h2>
            <p className="text-gray-500 text-sm mt-2">
              Instantly publish your portfolio with just one click. No setup, no
              hassle — your site goes live in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
