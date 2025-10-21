"use client";

import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ProductDesigner from "./ProductDesigner";
import NavBarDashboard from "../shared/NavBarDashboard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function ProductDesignerEdit({ placeholder, id }) {
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
    { id: "work", name: "Work Section", icon: "💼" },
    { id: "contact", name: "Contact Section", icon: "📞" },
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

            {/* Social Links */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🌐</span> Social Media
              </h3>
              <div className="space-y-4">
                {formData.nav?.socials?.map((social, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Platform
                        </label>
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
                          placeholder="Twitter"
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
                              "nav",
                              "socials",
                              e.target.value,
                              idx,
                              "url"
                            )
                          }
                          placeholder="https://twitter.com/username"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🎨</span> Color Scheme
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.nav?.colors?.textColor || "#111827"}
                      onChange={(e) =>
                        handleChange("nav", "colors", {
                          textColor: e.target.value,
                        })
                      }
                      className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hover Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.nav?.colors?.hoverColor || "#7c3aed"}
                      onChange={(e) =>
                        handleChange("nav", "colors", {
                          hoverColor: e.target.value,
                        })
                      }
                      className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.nav?.colors?.bgColor || "#ffffff"}
                      onChange={(e) =>
                        handleChange("nav", "colors", {
                          bgColor: e.target.value,
                        })
                      }
                      className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
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
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.hero?.jobTitle || ""}
                  onChange={(e) =>
                    handleChange("hero", "jobTitle", e.target.value)
                  }
                  placeholder="Senior Product Designer"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.hero?.name || ""}
                  onChange={(e) => handleChange("hero", "name", e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Professional Summary
              </label>
              <textarea
                value={formData.hero?.summary || ""}
                onChange={(e) =>
                  handleChange("hero", "summary", e.target.value)
                }
                placeholder="Passionate product designer with 8+ years of experience..."
                rows="4"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.hero?.cta?.text || ""}
                  onChange={(e) =>
                    handleChange("hero", "cta", { text: e.target.value })
                  }
                  placeholder="View My Work"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={formData.hero?.cta?.link || ""}
                  onChange={(e) =>
                    handleChange("hero", "cta", { link: e.target.value })
                  }
                  placeholder="/work"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    key: "bgColor",
                    label: "Background",
                    default: "#ffffff",
                  },
                  { key: "textColor", label: "Text", default: "#111827" },
                  {
                    key: "accentColor",
                    label: "Accent",
                    default: "#facc15",
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
                          formData.hero?.colors?.[color.key] || color.default
                        }
                        onChange={(e) =>
                          handleChange("hero", "colors", {
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
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.about?.heading || ""}
                    onChange={(e) =>
                      handleChange("about", "heading", e.target.value)
                    }
                    placeholder="About Me"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.about?.text || ""}
                    onChange={(e) =>
                      handleChange("about", "text", e.target.value)
                    }
                    placeholder="Tell your story..."
                    rows="4"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📅</span> Timeline
              </h3>
              <div className="space-y-4">
                {formData.about?.timeline?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Year
                        </label>
                        <input
                          type="text"
                          value={item.year || ""}
                          onChange={(e) =>
                            handleChange(
                              "about",
                              "timeline",
                              e.target.value,
                              idx,
                              "year"
                            )
                          }
                          placeholder="2014-2018"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={item.desc || ""}
                          onChange={(e) =>
                            handleChange(
                              "about",
                              "timeline",
                              e.target.value,
                              idx,
                              "desc"
                            )
                          }
                          placeholder="Timeline description..."
                          rows="3"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                        />
                      </div>
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
                <span>💼</span> Work Section
              </h3>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  value={formData.work?.heading || ""}
                  onChange={(e) =>
                    handleChange("work", "heading", e.target.value)
                  }
                  placeholder="My Work"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Work Items */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🖼️</span> Work Items
              </h3>
              <div className="space-y-6">
                {formData.work?.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={item.title || ""}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "items",
                              e.target.value,
                              idx,
                              "title"
                            )
                          }
                          placeholder="Project Title"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={item.desc || ""}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "items",
                              e.target.value,
                              idx,
                              "desc"
                            )
                          }
                          placeholder="Project description..."
                          rows="3"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Date
                        </label>
                        <input
                          type="text"
                          value={item.date || ""}
                          onChange={(e) =>
                            handleChange(
                              "work",
                              "items",
                              e.target.value,
                              idx,
                              "date"
                            )
                          }
                          placeholder="November 24, 2019"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Work Image
                        </label>
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
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                        {uploading && (
                          <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            Uploading image...
                          </p>
                        )}
                        {item.image && (
                          <div className="mt-3">
                            <img
                              src={item.image}
                              alt="Work preview"
                              className="w-32 h-32 rounded-lg object-cover border border-slate-200"
                            />
                          </div>
                        )}
                      </div>
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
                <span>📞</span> Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.contact?.heading || ""}
                    onChange={(e) =>
                      handleChange("contact", "heading", e.target.value)
                    }
                    placeholder="Contact Me"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.contact?.text || ""}
                    onChange={(e) =>
                      handleChange("contact", "text", e.target.value)
                    }
                    placeholder="Contact description..."
                    rows="3"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📧</span> Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact?.email || ""}
                    onChange={(e) =>
                      handleChange("contact", "email", e.target.value)
                    }
                    placeholder="johndoe@mail.com"
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Website
                  </label>
                  <input
                    type="text"
                    value={formData.contact?.website || ""}
                    onChange={(e) =>
                      handleChange("contact", "website", e.target.value)
                    }
                    placeholder="behance.com/johndoe"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Contact Image */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>🖼️</span> Contact Image
              </h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Contact Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload("contact", "image", e.target.files[0])
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
                  />
                  {uploading && (
                    <p className="text-sm text-blue-600 mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      Uploading image...
                    </p>
                  )}
                </div>
                {formData.contact?.image && (
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden">
                      <img
                        src={formData.contact.image}
                        alt="Contact preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
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
        <div className="flex gap-4 items-center">
          <Link
            href="/templates"
            className="h-[30px] w-[30px] rounded-full flex justify-center items-center bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all duration-200"
          >
            <FaArrowLeft className="text-black" />
          </Link>
          <span className="font-medium">Back</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 max-w-8xl mx-auto p-4 lg:p-6">
        {/* LEFT COLUMN - Navigation and Form Editor */}
        <div className="lg:w-2/5 flex flex-col gap-6">
          {/* SIDEBAR NAVIGATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span>📋</span> Sections
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-black border text-white shadow-sm"
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
              className="w-full mt-6 border-2 font-semibold py-3 px-4 rounded-xl hover:bg-gray-700 hover:text-white transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  <ProductDesigner placeholder={formData} />
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
