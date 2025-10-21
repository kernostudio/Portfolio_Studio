"use client";

import { FaArrowLeft } from "react-icons/fa6";
import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DeveloperPortfolio from "./DeveloperPortfolio";
import NavBarDashboard from "../shared/NavBarDashboard";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DeveloperPortfolioEdit({ placeholder, id }) {
  const [formData, setFormData] = useState(placeholder || {});
  const [uploading, setUploading] = useState(false);
  const [activeSection, setActiveSection] = useState("root");
  const axiosPublic = UseAxiosPublic();
  const { user } = useAuth();
  const router = useRouter();
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

  // File upload handler
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
      const res = await axiosPublic.post("/api/upload", formDataFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      if (data.url) {
        handleChange(section, key, data.url, index, subKey);
        toast.success("Image uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Submit all sections
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      try {
        // Try to check if the template exists
        const checkRes = await axiosPublic.get(
          `/api/user-templates/${user?.id}/${id}`
        );
        const existingTemplate = checkRes.data?.data;

        // If found, update it
        await axiosPublic.patch(`/api/user-templates/${user?.id}/${id}`, {
          filledValues: formData,
        });
        toast.success(
          "Template updated successfully check dashboard my templates!"
        );
        router.push(`/dashboard/myTemplates/${user?.id}`);
      } catch (error) {
        // If not found (404), create it
        if (error.response && error.response.status === 404) {
          await axiosPublic.post("/api/user-templates", {
            userId: user?.id,
            templateId: id,
            filledValues: formData,
          });
          toast.success(
            "Template created successfully check dashboard my templates!"
          );
          router.push(`/dashboard/myTemplates/${user?.id}`);
        } else {
          // Other errors (not 404)
          console.error("❌ Unexpected error:", error);
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      console.error("❌ Error saving template:", err);
      toast.error("Failed to save template!");
    } finally {
      setUploading(false);
    }
  };

  const sections = [
    { id: "root", name: "Root Settings", icon: "⚙️" },
    { id: "nav", name: "Navigation", icon: "🧭" },
    { id: "hero", name: "Hero Section", icon: "🌟" },
    { id: "about", name: "About Section", icon: "👤" },
    { id: "skills", name: "Skills", icon: "💻" },
    { id: "experience", name: "Experience", icon: "💼" },
    { id: "work", name: "Works", icon: "🚀" },
    { id: "contact", name: "Contact", icon: "📞" },
    { id: "footer", name: "Footer", icon: "🔻" },
  ];

  // Render form content for active section
  const renderFormContent = () => {
    switch (activeSection) {
      case "root":
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Background Color
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={formData.root?.bgColor || "#ffffff"}
                  onChange={(e) =>
                    handleChange("root", "bgColor", e.target.value)
                  }
                  className="w-16 h-16 border-2 border-slate-200 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                />
                <span className="text-sm font-mono text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
                  {formData.root?.bgColor || "#ffffff"}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📝</span> Text Color
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={formData.root?.textColor || "#111827"}
                  onChange={(e) =>
                    handleChange("root", "textColor", e.target.value)
                  }
                  className="w-16 h-16 border-2 border-slate-200 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                />
                <span className="text-sm font-mono text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
                  {formData.root?.textColor || "#111827"}
                </span>
              </div>
            </div>
          </div>
        );

      case "nav":
        return (
          <div className="space-y-8 animate-fadeIn">
            {/* Logo */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🏢</span> Logo Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Logo Text
                  </label>
                  <input
                    type="text"
                    value={formData.nav?.logo?.text || ""}
                    onChange={(e) =>
                      handleChange("nav", "logo", { text: e.target.value })
                    }
                    placeholder="Your logo text..."
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Logo Accent Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={formData.nav?.logo?.accentColor || "#ff6300"}
                      onChange={(e) =>
                        handleChange("nav", "logo", {
                          accentColor: e.target.value,
                        })
                      }
                      className="w-16 h-16 border-2 border-slate-200 rounded-xl cursor-pointer"
                    />
                    <span className="text-sm font-mono text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
                      {formData.nav?.logo?.accentColor || "#ff6300"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🔗</span> Navigation Links
              </h3>
              <div className="space-y-4">
                {formData.nav?.links?.map((link, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={link.label || ""}
                          onChange={(e) =>
                            handleChange(
                              "nav",
                              "links",
                              e.target.value,
                              idx,
                              "label"
                            )
                          }
                          placeholder="Home"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          URL
                        </label>
                        <input
                          type="text"
                          value={link.href || ""}
                          onChange={(e) =>
                            handleChange(
                              "nav",
                              "links",
                              e.target.value,
                              idx,
                              "href"
                            )
                          }
                          placeholder="/home"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📥</span> CTA Button
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.nav?.ctaButton?.text || ""}
                    onChange={(e) =>
                      handleChange("nav", "ctaButton", { text: e.target.value })
                    }
                    placeholder="Download CV"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Button URL
                  </label>
                  <input
                    type="text"
                    value={formData.nav?.ctaButton?.url || ""}
                    onChange={(e) =>
                      handleChange("nav", "ctaButton", { url: e.target.value })
                    }
                    placeholder="https://example.com/cv.pdf"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Button Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.nav?.ctaButton?.bgColor || "#000000"}
                      onChange={(e) =>
                        handleChange("nav", "ctaButton", {
                          bgColor: e.target.value,
                        })
                      }
                      className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Button Text Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.nav?.ctaButton?.textColor || "#ffffff"}
                      onChange={(e) =>
                        handleChange("nav", "ctaButton", {
                          textColor: e.target.value,
                        })
                      }
                      className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Color Scheme
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "bgColor", label: "Background", default: "#ffffff" },
                  { key: "textColor", label: "Text", default: "#111827" },
                  { key: "hoverColor", label: "Hover", default: "#ff6300" },
                  { key: "accentColor", label: "Accent", default: "#ff6300" },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={
                          formData.nav?.colors?.[color.key] || color.default
                        }
                        onChange={(e) =>
                          handleChange("nav", "colors", {
                            [color.key]: e.target.value,
                          })
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.hero?.name || ""}
                  onChange={(e) => handleChange("hero", "name", e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Greeting
                </label>
                <input
                  type="text"
                  value={formData.hero?.greeting || ""}
                  onChange={(e) =>
                    handleChange("hero", "greeting", e.target.value)
                  }
                  placeholder="👋"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.hero?.title || ""}
                  onChange={(e) =>
                    handleChange("hero", "title", e.target.value)
                  }
                  placeholder="Full Stack Developer"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.hero?.location || ""}
                  onChange={(e) =>
                    handleChange("hero", "location", e.target.value)
                  }
                  placeholder="City, Country"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.hero?.description || ""}
                onChange={(e) =>
                  handleChange("hero", "description", e.target.value)
                }
                placeholder="Professional description..."
                rows="4"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Availability
                </label>
                <select
                  value={formData.hero?.availability ? "true" : "false"}
                  onChange={(e) =>
                    handleChange(
                      "hero",
                      "availability",
                      e.target.value === "true"
                    )
                  }
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🖼️</span> Profile Image
              </h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(
                        "hero",
                        "profileImage",
                        e.target.files[0]
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
                  />
                  {uploading && (
                    <div className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Uploading image...
                    </div>
                  )}
                </div>
                {formData.hero?.profileImage && (
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden">
                      <img
                        src={formData.hero.profileImage}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hero Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Hero Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "textColor", label: "Text", default: "#111827" },
                  { key: "accentColor", label: "Accent", default: "#ff6300" },
                  {
                    key: "descriptionColor",
                    label: "Description",
                    default: "#6b7280",
                  },
                  {
                    key: "locationColor",
                    label: "Location",
                    default: "#374151",
                  },
                  {
                    key: "availabilityColor",
                    label: "Availability",
                    default: "#374151",
                  },
                  {
                    key: "imageBorderColor",
                    label: "Image Border",
                    default: "#ffffff",
                  },
                  {
                    key: "imageShadowColor",
                    label: "Image Shadow",
                    default: "#f9fafb",
                  },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.hero?.[color.key] || color.default}
                        onChange={(e) =>
                          handleChange("hero", color.key, e.target.value)
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📝</span> About Content
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.about?.title || ""}
                    onChange={(e) =>
                      handleChange("about", "title", e.target.value)
                    }
                    placeholder="About Me"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.about?.heading || ""}
                    onChange={(e) =>
                      handleChange("about", "heading", e.target.value)
                    }
                    placeholder="Curious about me? Here you have it:"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📄</span> Paragraphs
              </h3>
              <div className="space-y-4">
                {formData.about?.paragraphs?.map((paragraph, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Paragraph {idx + 1}
                    </label>
                    <textarea
                      value={paragraph || ""}
                      onChange={(e) =>
                        handleChange("about", "paragraphs", e.target.value, idx)
                      }
                      rows="3"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Bits */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>⚡</span> Quick Bits
              </h3>
              <div className="space-y-4">
                {formData.about?.quickBits?.map((bit, idx) => (
                  <div key={idx}>
                    <input
                      type="text"
                      value={bit || ""}
                      onChange={(e) =>
                        handleChange("about", "quickBits", e.target.value, idx)
                      }
                      placeholder="Quick bit about you..."
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Final Paragraph */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🔚</span> Final Paragraph
              </h3>
              <textarea
                value={formData.about?.finalParagraph || ""}
                onChange={(e) =>
                  handleChange("about", "finalParagraph", e.target.value)
                }
                rows="3"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
              />
            </div>

            {/* About Image */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🖼️</span> About Image
              </h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload About Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload("about", "aboutImage", e.target.files[0])
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
                  />
                  {uploading && (
                    <div className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Uploading image...
                    </div>
                  )}
                </div>
                {formData.about?.aboutImage && (
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden">
                      <img
                        src={formData.about.aboutImage}
                        alt="About preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> About Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "bgColor", label: "Background", default: "#f9fafb" },
                  { key: "textColor", label: "Text", default: "#111827" },
                  { key: "headingColor", label: "Heading", default: "#111827" },
                  {
                    key: "paragraphColor",
                    label: "Paragraph",
                    default: "#6b7280",
                  },
                  {
                    key: "quickBitsColor",
                    label: "Quick Bits",
                    default: "#6b7280",
                  },
                  {
                    key: "titleBgColor",
                    label: "Title Background",
                    default: "#e5e7eb",
                  },
                  {
                    key: "titleTextColor",
                    label: "Title Text",
                    default: "#111827",
                  },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.about?.[color.key] || color.default}
                        onChange={(e) =>
                          handleChange("about", color.key, e.target.value)
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>💻</span> Skills Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.skills?.title || ""}
                    onChange={(e) =>
                      handleChange("skills", "title", e.target.value)
                    }
                    placeholder="Skills"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Skills Items */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🛠️</span> Skills Items
              </h3>
              <div className="space-y-6">
                {formData.skills?.items?.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Skill Name
                        </label>
                        <input
                          type="text"
                          value={skill.name || ""}
                          onChange={(e) =>
                            handleChange(
                              "skills",
                              "items",
                              e.target.value,
                              idx,
                              "name"
                            )
                          }
                          placeholder="JavaScript"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Icon URL
                        </label>
                        <input
                          type="text"
                          value={skill.icon || ""}
                          onChange={(e) =>
                            handleChange(
                              "skills",
                              "items",
                              e.target.value,
                              idx,
                              "icon"
                            )
                          }
                          placeholder="https://example.com/icon.png"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Skills Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "bgColor", label: "Background", default: "#ffffff" },
                  {
                    key: "titleBgColor",
                    label: "Title Background",
                    default: "#e5e7eb",
                  },
                  {
                    key: "titleTextColor",
                    label: "Title Text",
                    default: "#111827",
                  },
                  {
                    key: "skillNameColor",
                    label: "Skill Name",
                    default: "#111827",
                  },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.skills?.[color.key] || color.default}
                        onChange={(e) =>
                          handleChange("skills", color.key, e.target.value)
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>💼</span> Experience Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Show Section
                  </label>
                  <select
                    value={formData.experience?.showSection ? "true" : "false"}
                    onChange={(e) =>
                      handleChange(
                        "experience",
                        "showSection",
                        e.target.value === "true"
                      )
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="true">Show</option>
                    <option value="false">Hide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.experience?.title || ""}
                    onChange={(e) =>
                      handleChange("experience", "title", e.target.value)
                    }
                    placeholder="Experience"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.experience?.subtitle || ""}
                    onChange={(e) =>
                      handleChange("experience", "subtitle", e.target.value)
                    }
                    placeholder="Here is a quick summary of my most recent experiences:"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Experience Items */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🏢</span> Experience Items
              </h3>
              <div className="space-y-6">
                {formData.experience?.experiences?.map((exp, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={exp.title || ""}
                          onChange={(e) =>
                            handleChange(
                              "experience",
                              "experiences",
                              e.target.value,
                              idx,
                              "title"
                            )
                          }
                          placeholder="Senior Developer"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            value={exp.company || ""}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "company"
                              )
                            }
                            placeholder="Tech Company"
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Period
                          </label>
                          <input
                            type="text"
                            value={exp.period || ""}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "period"
                              )
                            }
                            placeholder="Jan 2020 - Present"
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={exp.description || ""}
                          onChange={(e) =>
                            handleChange(
                              "experience",
                              "experiences",
                              e.target.value,
                              idx,
                              "description"
                            )
                          }
                          rows="3"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Location Type
                        </label>
                        <input
                          type="text"
                          value={exp.locationType || ""}
                          onChange={(e) =>
                            handleChange(
                              "experience",
                              "experiences",
                              e.target.value,
                              idx,
                              "locationType"
                            )
                          }
                          placeholder="Remote"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Technologies (comma separated)
                        </label>
                        <input
                          type="text"
                          value={exp.technologies?.join(", ") || ""}
                          onChange={(e) =>
                            handleChange(
                              "experience",
                              "experiences",
                              e.target.value
                                .split(",")
                                .map((tech) => tech.trim()),
                              idx,
                              "technologies"
                            )
                          }
                          placeholder="React, Node.js, TypeScript"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Border Color
                          </label>
                          <input
                            type="color"
                            value={exp.borderColor || "#3b82f6"}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "borderColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Title Color
                          </label>
                          <input
                            type="color"
                            value={exp.titleColor || "#111827"}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "titleColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Company Color
                          </label>
                          <input
                            type="color"
                            value={exp.companyColor || "#6b7280"}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "companyColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Period Color
                          </label>
                          <input
                            type="color"
                            value={exp.periodColor || "#6b7280"}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "periodColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description Color
                          </label>
                          <input
                            type="color"
                            value={exp.descriptionColor || "#6b7280"}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "descriptionColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Tech Background Color
                          </label>
                          <input
                            type="color"
                            value={exp.techBgColor || "#f3f4f6"}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                "experiences",
                                e.target.value,
                                idx,
                                "techBgColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tech Text Color
                        </label>
                        <input
                          type="color"
                          value={exp.techTextColor || "#374151"}
                          onChange={(e) =>
                            handleChange(
                              "experience",
                              "experiences",
                              e.target.value,
                              idx,
                              "techTextColor"
                            )
                          }
                          className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Experience Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "bgColor", label: "Background", default: "#f9fafb" },
                  {
                    key: "titleBgColor",
                    label: "Title Background",
                    default: "#e5e7eb",
                  },
                  {
                    key: "titleTextColor",
                    label: "Title Text",
                    default: "#111827",
                  },
                  {
                    key: "subtitleColor",
                    label: "Subtitle",
                    default: "#6b7280",
                  },
                  {
                    key: "cardBgColor",
                    label: "Card Background",
                    default: "#ffffff",
                  },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={
                          formData.experience?.[color.key] || color.default
                        }
                        onChange={(e) =>
                          handleChange("experience", color.key, e.target.value)
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "work":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🚀</span> Works Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.work?.title || ""}
                    onChange={(e) =>
                      handleChange("work", "title", e.target.value)
                    }
                    placeholder="Works"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.work?.subtitle || ""}
                    onChange={(e) =>
                      handleChange("work", "subtitle", e.target.value)
                    }
                    placeholder="Some of the noteworthy projects I have built:"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Project Items */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🖼️</span> Project Items
              </h3>
              <div className="space-y-6">
                {formData.work?.projects?.map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Project Name
                        </label>
                        <input
                          type="text"
                          value={project.name || ""}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "projects",
                              e.target.value,
                              idx,
                              "name"
                            )
                          }
                          placeholder="Project Name"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={project.description || ""}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "projects",
                              e.target.value,
                              idx,
                              "description"
                            )
                          }
                          rows="3"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Project Link
                        </label>
                        <input
                          type="text"
                          value={project.link || ""}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "projects",
                              e.target.value,
                              idx,
                              "link"
                            )
                          }
                          placeholder="https://github.com/username"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Layout
                        </label>
                        <select
                          value={project.layout || "left"}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "projects",
                              e.target.value,
                              idx,
                              "layout"
                            )
                          }
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Project Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(
                              "work",
                              "projects",
                              e.target.files[0],
                              idx,
                              "image"
                            )
                          }
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                        {uploading && (
                          <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            Uploading image...
                          </p>
                        )}
                        {project.image && (
                          <div className="mt-3">
                            <img
                              src={project.image}
                              alt="Project preview"
                              className="w-32 h-32 rounded-lg object-cover border border-slate-200"
                            />
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Project Name Color
                          </label>
                          <input
                            type="color"
                            value={project.projectNameColor || "#111827"}
                            onChange={(e) =>
                              handleChange(
                                "work",
                                "projects",
                                e.target.value,
                                idx,
                                "projectNameColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description Color
                          </label>
                          <input
                            type="color"
                            value={project.descriptionColor || "#6b7280"}
                            onChange={(e) =>
                              handleChange(
                                "work",
                                "projects",
                                e.target.value,
                                idx,
                                "descriptionColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Card Background Color
                        </label>
                        <input
                          type="color"
                          value={project.cardBgColor || "#ffffff"}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "projects",
                              e.target.value,
                              idx,
                              "cardBgColor"
                            )
                          }
                          className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                      {/* Technologies */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Technologies
                        </label>
                        <div className="space-y-2">
                          {project.technologies?.map((tech, techIdx) => (
                            <div
                              key={techIdx}
                              className="grid grid-cols-1 md:grid-cols-3 gap-2"
                            >
                              <input
                                type="text"
                                value={tech.name || ""}
                                onChange={(e) =>
                                  handleChange(
                                    "work",
                                    "projects",
                                    e.target.value,
                                    idx,
                                    `technologies[${techIdx}].name`
                                  )
                                }
                                placeholder="Technology"
                                className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <input
                                type="color"
                                value={tech.bgColor || "#dbeafe"}
                                onChange={(e) =>
                                  handleChange(
                                    "work",
                                    "projects",
                                    e.target.value,
                                    idx,
                                    `technologies[${techIdx}].bgColor`
                                  )
                                }
                                className="w-full border-2 border-slate-200 rounded-lg cursor-pointer"
                              />
                              <input
                                type="color"
                                value={tech.textColor || "#1e40af"}
                                onChange={(e) =>
                                  handleChange(
                                    "work",
                                    "projects",
                                    e.target.value,
                                    idx,
                                    `technologies[${techIdx}].textColor`
                                  )
                                }
                                className="w-full border-2 border-slate-200 rounded-lg cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Work Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    key: "titleBgColor",
                    label: "Title Background",
                    default: "#e5e7eb",
                  },
                  {
                    key: "titleTextColor",
                    label: "Title Text",
                    default: "#111827",
                  },
                  {
                    key: "subtitleColor",
                    label: "Subtitle",
                    default: "#6b7280",
                  },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.work?.[color.key] || color.default}
                        onChange={(e) =>
                          handleChange("work", color.key, e.target.value)
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📞</span> Contact Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.contact?.title || ""}
                    onChange={(e) =>
                      handleChange("contact", "title", e.target.value)
                    }
                    placeholder="Get In Touch"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    value={formData.contact?.subtitle || ""}
                    onChange={(e) =>
                      handleChange("contact", "subtitle", e.target.value)
                    }
                    rows="2"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📧</span> Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    value={formData.contact?.email || ""}
                    onChange={(e) =>
                      handleChange("contact", "email", e.target.value)
                    }
                    placeholder="your@email.com"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.contact?.phone || ""}
                    onChange={(e) =>
                      handleChange("contact", "phone", e.target.value)
                    }
                    placeholder="+1234567890"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🌐</span> Social Media
              </h3>
              <div className="space-y-4">
                {formData.contact?.socialLinks?.map((social, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Platform
                        </label>
                        <input
                          type="text"
                          value={social.platform || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "socialLinks",
                              e.target.value,
                              idx,
                              "platform"
                            )
                          }
                          placeholder="GitHub"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Icon Name
                        </label>
                        <input
                          type="text"
                          value={social.icon || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "socialLinks",
                              e.target.value,
                              idx,
                              "icon"
                            )
                          }
                          placeholder="FaGithub"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          URL
                        </label>
                        <input
                          type="text"
                          value={social.url || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "socialLinks",
                              e.target.value,
                              idx,
                              "url"
                            )
                          }
                          placeholder="https://github.com/username"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Text */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>💬</span> Social Text
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Social Text
                </label>
                <input
                  type="text"
                  value={formData.contact?.socialText || ""}
                  onChange={(e) =>
                    handleChange("contact", "socialText", e.target.value)
                  }
                  placeholder="You may also find me on these platforms!"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Contact Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Contact Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    key: "titleBgColor",
                    label: "Title Background",
                    default: "#e5e7eb",
                  },
                  {
                    key: "titleTextColor",
                    label: "Title Text",
                    default: "#111827",
                  },
                  {
                    key: "subtitleColor",
                    label: "Subtitle",
                    default: "#6b7280",
                  },
                  { key: "emailColor", label: "Email", default: "#111827" },
                  { key: "phoneColor", label: "Phone", default: "#111827" },
                  {
                    key: "socialTextColor",
                    label: "Social Text",
                    default: "#111827",
                  },
                  { key: "iconColor", label: "Icon", default: "#111827" },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.contact?.[color.key] || color.default}
                        onChange={(e) =>
                          handleChange("contact", color.key, e.target.value)
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🔻</span> Footer
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Footer Text
                  </label>
                  <input
                    type="text"
                    value={formData.footer?.text || ""}
                    onChange={(e) =>
                      handleChange("footer", "text", e.target.value)
                    }
                    placeholder="© 2023 | Designed and coded with ❤️️ by Your Name"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Footer Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Footer Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "bgColor", label: "Background", default: "#f3f4f6" },
                  { key: "textColor", label: "Text", default: "#111827" },
                ].map((color) => (
                  <div key={color.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {color.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.footer?.[color.key] || color.default}
                        onChange={(e) =>
                          handleChange("footer", color.key, e.target.value)
                        }
                        className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBarDashboard />
      <div className="w-11/12 mx-auto">
        <Link
          href="/templates"
          className="h-[30px] w-[30px] rounded-full flex justify-center items-center bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all duration-200"
        >
          <FaArrowLeft className="text-black" />
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 max-w-8xl mx-auto p-4 lg:p-6">
        {/* LEFT COLUMN - Navigation and Form Editor */}
        <div className="lg:w-2/5 flex flex-col gap-6">
          {/* SIDEBAR NAVIGATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span>📋</span>Page Sections
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-black text-white  border  shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium text-sm">{section.name}</span>
                </button>
              ))}
            </nav>

            <button
              type="submit"
              form="template-form"
              disabled={uploading}
              className="w-full mt-6 border-2 font-semibold py-3 px-4 rounded-xl hover:bg-gray-700 transition-all hover:text-white duration-200 shadow-lg  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Save All Changes
                </>
              )}
            </button>
          </div>

          {/* FORM EDITOR - Appears under the selected section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1">
            <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span className="text-3xl">
                  {sections.find((s) => s.id === activeSection)?.icon}
                </span>
                {sections.find((s) => s.id === activeSection)?.name}
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Customize your template with real-time preview
              </p>
            </div>

            <form
              id="template-form"
              onSubmit={handleSubmit}
              className="p-6 space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto"
            >
              {renderFormContent()}
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN - Live Preview */}
        <div className="lg:w-3/5 flex-shrink-0 border-t-2 border-l-2">
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <span>👁️</span> Live Preview
                </h2>
                <p className="text-slate-600 text-sm">
                  Real-time template preview
                </p>
              </div>
              <div className="p-4 bg-slate-50">
                {/* Scrollable Preview */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl overflow-auto bg-white shadow-sm max-h-[70vh]">
                  <DeveloperPortfolio placeholder={formData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
