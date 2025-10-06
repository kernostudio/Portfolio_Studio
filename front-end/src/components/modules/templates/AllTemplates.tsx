"use client";

export default function AllTemplates() {
  return (
    <div className="w-11/12 mx-auto mt-10">
      {/* sidebar */}
      <div className="w-[320px] p-5 bg-white border-gray-200 border-2 rounded-2xl h-[784px]">
        <div className="flex items-center gap-2">
          <img
            className="w-7"
            src="https://img.icons8.com/?size=100&id=3004&format=png&color=000000"
            alt="filter"
          ></img>
          <h1 className="font-semibold text-xl">Filters</h1>
        </div>
        <h1 className="mt-10">Search</h1>
        <input type="text" />
      </div>
    </div>
  );
}
