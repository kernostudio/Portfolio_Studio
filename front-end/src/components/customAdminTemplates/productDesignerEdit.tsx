"use client";

import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDesignerEdit({ placeholder, id }) {
  const [formData, setFormData] = useState(placeholder || {});
  const [uploading, setUploading] = useState(false);
  const axiosPublic = UseAxiosPublic();
  const { user } = useAuth();

  // Generic change handler
  const handleChange = (section, key, value, index = null, subKey = null) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (!updated[section]) updated[section] = {};
      if (index !== null) {
        if (!Array.isArray(updated[section][key])) updated[section][key] = [];
        if (!updated[section][key][index]) updated[section][key][index] = {};
        if (subKey !== null) {
          updated[section][key][index][subKey] = value;
        } else {
          updated[section][key][index] = value;
        }
      } else if (
        typeof updated[section][key] === "object" &&
        !Array.isArray(updated[section][key])
      ) {
        updated[section][key] = { ...updated[section][key], ...value };
      } else {
        updated[section][key] = value;
      }
      return updated;
    });
  };

  // Upload file to backend
  const handleFileUpload = async (
    section,
    key,
    file,
    index = null,
    subKey = null
  ) => {
    if (!file) return;
    setUploading(true);
    const formDataFile = new FormData();
    formDataFile.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataFile,
      });
      const data = await res.json();
      if (data.url) {
        handleChange(section, key, data.url, index, subKey);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Submit all sections at once
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const res = await axiosPublic.post("/api/user-templates", {
        userId: user?.id,
        templateId: id,
        filledValues: formData,
      });
      toast.success("Template saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save template!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-12">
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* ROOT SECTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Root Settings</h2>
          <label className="block font-medium mb-2">Background Color:</label>
          <input
            type="color"
            value={formData.root?.bgColor || "#ffffff"}
            onChange={(e) => handleChange("root", "bgColor", e.target.value)}
            className="w-20 h-10 border rounded-lg cursor-pointer"
          />
        </section>

        {/* NAV SECTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
          <label className="block font-medium mb-2">Logo Text:</label>
          <input
            type="text"
            value={formData.nav?.logo?.text || ""}
            onChange={(e) =>
              handleChange("nav", "logo", { text: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />

          <h3 className="font-medium mt-4 mb-2">Nav Links:</h3>
          {formData.nav?.links?.map((link, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-2 mb-2">
              <input
                type="text"
                value={link.label || ""}
                onChange={(e) =>
                  handleChange("nav", "links", e.target.value, idx, "label")
                }
                className="border p-2 rounded-lg flex-1"
                placeholder="Label"
              />
              <input
                type="text"
                value={link.href || ""}
                onChange={(e) =>
                  handleChange("nav", "links", e.target.value, idx, "href")
                }
                className="border p-2 rounded-lg flex-1"
                placeholder="Href"
              />
            </div>
          ))}

          <h3 className="font-medium mt-4 mb-2">Socials:</h3>
          {formData.nav?.socials?.map((social, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-2 mb-2">
              <input
                type="text"
                value={social.platform || ""}
                onChange={(e) =>
                  handleChange(
                    "nav",
                    "socials",
                    e.target.value,
                    idx,
                    "platform"
                  )
                }
                className="border p-2 rounded-lg flex-1"
                placeholder="Platform"
              />
              <input
                type="text"
                value={social.url || ""}
                onChange={(e) =>
                  handleChange("nav", "socials", e.target.value, idx, "url")
                }
                className="border p-2 rounded-lg flex-1"
                placeholder="URL"
              />
            </div>
          ))}

          <h3 className="font-medium mt-4 mb-2">Colors:</h3>
          <div className="flex gap-4 mt-2">
            <input
              type="color"
              value={formData.nav?.colors?.textColor || "#111827"}
              onChange={(e) =>
                handleChange("nav", "colors", { textColor: e.target.value })
              }
              className="w-12 h-12 rounded-lg cursor-pointer"
            />
            <input
              type="color"
              value={formData.nav?.colors?.hoverColor || "#7c3aed"}
              onChange={(e) =>
                handleChange("nav", "colors", { hoverColor: e.target.value })
              }
              className="w-12 h-12 rounded-lg cursor-pointer"
            />
            <input
              type="color"
              value={formData.nav?.colors?.bgColor || "#ffffff"}
              onChange={(e) =>
                handleChange("nav", "colors", { bgColor: e.target.value })
              }
              className="w-12 h-12 rounded-lg cursor-pointer"
            />
          </div>
        </section>

        {/* HERO SECTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
          <input
            type="text"
            value={formData.hero?.jobTitle || ""}
            onChange={(e) => handleChange("hero", "jobTitle", e.target.value)}
            placeholder="Job Title"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            value={formData.hero?.name || ""}
            onChange={(e) => handleChange("hero", "name", e.target.value)}
            placeholder="Name"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <textarea
            value={formData.hero?.summary || ""}
            onChange={(e) => handleChange("hero", "summary", e.target.value)}
            placeholder="Summary"
            className="border p-2 rounded-lg w-full mb-2"
          />

          <input
            type="text"
            value={formData.hero?.cta?.text || ""}
            onChange={(e) =>
              handleChange("hero", "cta", { text: e.target.value })
            }
            placeholder="Button Text (e.g., Resume)"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            value={formData.hero?.cta?.link || ""}
            onChange={(e) =>
              handleChange("hero", "cta", { link: e.target.value })
            }
            placeholder="Button Link"
            className="border p-2 rounded-lg w-full mb-2"
          />

          <label className="block font-medium mt-2 mb-1">Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileUpload("hero", "profileImage", e.target.files[0])
            }
            className="border p-2 rounded-lg w-full"
          />
          {uploading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
          {formData.hero?.profileImage && (
            <img
              src={formData.hero.profileImage}
              className="w-48 h-48 rounded-xl mt-2"
            />
          )}
        </section>

        {/* ABOUT SECTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Section</h2>
          <input
            type="text"
            value={formData.about?.heading || ""}
            onChange={(e) => handleChange("about", "heading", e.target.value)}
            placeholder="Heading"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <textarea
            value={formData.about?.text || ""}
            onChange={(e) => handleChange("about", "text", e.target.value)}
            placeholder="Text"
            className="border p-2 rounded-lg w-full mb-2"
          />
          {formData.about?.timeline?.map((item, idx) => (
            <div key={idx} className="border p-3 rounded-lg bg-gray-50 mb-2">
              <input
                type="text"
                value={item.year || ""}
                onChange={(e) =>
                  handleChange("about", "timeline", e.target.value, idx, "year")
                }
                placeholder="Year"
                className="border p-2 rounded-lg w-full mb-2"
              />
              <textarea
                value={item.desc || ""}
                onChange={(e) =>
                  handleChange("about", "timeline", e.target.value, idx, "desc")
                }
                placeholder="Description"
                className="border p-2 rounded-lg w-full"
              />
            </div>
          ))}
        </section>

        {/* WORK SECTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Work Section</h2>
          {formData.work?.items?.map((item, idx) => (
            <div
              key={idx}
              className="border p-3 rounded-lg bg-gray-50 mb-2 space-y-2"
            >
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) =>
                  handleChange("work", "items", e.target.value, idx, "title")
                }
                placeholder="Title"
                className="border p-2 rounded-lg w-full"
              />
              <textarea
                value={item.desc || ""}
                onChange={(e) =>
                  handleChange("work", "items", e.target.value, idx, "desc")
                }
                placeholder="Description"
                className="border p-2 rounded-lg w-full"
              />
              <input
                type="text"
                value={item.date || ""}
                onChange={(e) =>
                  handleChange("work", "items", e.target.value, idx, "date")
                }
                placeholder="Date"
                className="border p-2 rounded-lg w-full"
              />
              <label className="block font-medium mt-2">Work Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileUpload(
                    "work",
                    "items",
                    e.target.files[0],
                    idx,
                    "image"
                  )
                }
                className="border p-2 rounded-lg w-full"
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
              )}
              {item.image && (
                <img src={item.image} className="w-48 h-48 rounded-xl mt-2" />
              )}
            </div>
          ))}
        </section>

        {/* CONTACT SECTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Section</h2>
          <input
            type="text"
            value={formData.contact?.heading || ""}
            onChange={(e) => handleChange("contact", "heading", e.target.value)}
            placeholder="Heading"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <textarea
            value={formData.contact?.text || ""}
            onChange={(e) => handleChange("contact", "text", e.target.value)}
            placeholder="Text"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <input
            type="email"
            value={formData.contact?.email || ""}
            onChange={(e) => handleChange("contact", "email", e.target.value)}
            placeholder="Email"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            value={formData.contact?.phone || ""}
            onChange={(e) => handleChange("contact", "phone", e.target.value)}
            placeholder="Phone"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <input
            type="text"
            value={formData.contact?.website || ""}
            onChange={(e) => handleChange("contact", "website", e.target.value)}
            placeholder="Website"
            className="border p-2 rounded-lg w-full mb-2"
          />
          <label className="block font-medium mt-2 mb-1">Contact Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileUpload("contact", "image", e.target.files[0])
            }
            className="border p-2 rounded-lg w-full"
          />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {formData.contact?.image && (
            <img
              src={formData.contact.image}
              className="w-48 h-48 rounded-xl mt-2"
            />
          )}
        </section>

        {/* ✅ Single Global Save Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white text-lg py-3 rounded-xl hover:bg-purple-700 transition mt-6"
        >
          Save All Changes
        </button>
      </form>
    </div>
  );
}
