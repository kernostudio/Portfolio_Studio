"use client";
import { GoGear } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { GoNote } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { GoRocket } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";
import { GoRepo } from "react-icons/go";

import { useAuth } from "@/Auth/AuthContext";
import UseAxiosPublic from "@/hooks/axiosPublic";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UiUxDesigner from "./UiUxDesigner";
import NavBarDashboard from "../shared/NavBarDashboard";
import { API_BASE_URL } from "@/utils/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function UiUxDesignerEdit({ placeholder, id }) {
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
    { id: "root", name: "Root Settings", icon: GoGear },
    { id: "nav", name: "Navigation", icon: GoHome },
    { id: "hero", name: "Hero", icon: GoNote },
    { id: "about", name: "About", icon: GoPerson },
    { id: "services", name: "Services", icon: GoRocket },
    { id: "projects", name: "Projects", icon: GoRepo },
    { id: "contact", name: "Contact", icon: GoComment },
    { id: "footer", name: "Footer", icon: GoArrowDown },
  ];

  // Render form content for active section
  const renderFormContent = () => {
    switch (activeSection) {
      case "root":
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Background Color
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
                Logo Settings
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
                Navigation Links
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
                      value={formData.nav?.ctaButton?.bgColor || "#ff6300"}
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
                Color Scheme
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
                  Greeting Text
                </label>
                <input
                  type="text"
                  value={formData.hero?.greeting || ""}
                  onChange={(e) =>
                    handleChange("hero", "greeting", e.target.value)
                  }
                  placeholder="Hi I am"
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
                  placeholder="UI & UX Designer"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Professional Description
              </label>
              <textarea
                value={formData.hero?.description || ""}
                onChange={(e) =>
                  handleChange("hero", "description", e.target.value)
                }
                placeholder="Passionate UI/UX designer with experience..."
                rows="4"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
              />
            </div>

            {/* CTA Button */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Hero CTA Button
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.ctaButton?.text || ""}
                    onChange={(e) =>
                      handleChange("hero", "ctaButton", {
                        text: e.target.value,
                      })
                    }
                    placeholder="Hire Me"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Button URL
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.ctaButton?.url || ""}
                    onChange={(e) =>
                      handleChange("hero", "ctaButton", { url: e.target.value })
                    }
                    placeholder="mailto:example@email.com"
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
                      value={formData.hero?.ctaButton?.bgColor || "#ff6300"}
                      onChange={(e) =>
                        handleChange("hero", "ctaButton", {
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
                      value={formData.hero?.ctaButton?.textColor || "#ffffff"}
                      onChange={(e) =>
                        handleChange("hero", "ctaButton", {
                          textColor: e.target.value,
                        })
                      }
                      className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Profile Image
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
                Hero Colors
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
                About Content
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
                    value={formData.about?.description || ""}
                    onChange={(e) =>
                      handleChange("about", "description", e.target.value)
                    }
                    placeholder="Tell your story..."
                    rows="4"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>
            </div>

            {/* About Image */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                About Image
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
                      handleFileUpload("about", "image", e.target.files[0])
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
                {formData.about?.image && (
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden">
                      <img
                        src={formData.about.image}
                        alt="About preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Skills
              </h3>
              <div className="space-y-4">
                {formData.about?.skills?.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
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
                              "about",
                              "skills",
                              e.target.value,
                              idx,
                              "name"
                            )
                          }
                          placeholder="UX Design"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Skill Level (0-100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={skill.level || 0}
                          onChange={(e) =>
                            handleChange(
                              "about",
                              "skills",
                              parseInt(e.target.value),
                              idx,
                              "level"
                            )
                          }
                          placeholder="85"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                About Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "textColor", label: "Text", default: "#111827" },
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
                          formData.about?.colors?.[color.key] || color.default
                        }
                        onChange={(e) =>
                          handleChange("about", "colors", {
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

      case "services":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Services Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.services?.heading || ""}
                    onChange={(e) =>
                      handleChange("services", "heading", e.target.value)
                    }
                    placeholder="Services"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.services?.description || ""}
                    onChange={(e) =>
                      handleChange("services", "description", e.target.value)
                    }
                    placeholder="Services description..."
                    rows="3"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>
            </div>

            {/* Service Items */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Service Items
              </h3>
              <div className="space-y-6">
                {formData.services?.items?.map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={service.title || ""}
                          onChange={(e) =>
                            handleChange(
                              "services",
                              "items",
                              e.target.value,
                              idx,
                              "title"
                            )
                          }
                          placeholder="UI/UX Design"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={service.description || ""}
                          onChange={(e) =>
                            handleChange(
                              "services",
                              "items",
                              e.target.value,
                              idx,
                              "description"
                            )
                          }
                          placeholder="Service description..."
                          rows="3"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Icon URL
                          </label>
                          <input
                            type="text"
                            value={service.icon || ""}
                            onChange={(e) =>
                              handleChange(
                                "services",
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
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Background Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={service.bgColor || "#f9fafb"}
                              onChange={(e) =>
                                handleChange(
                                  "services",
                                  "items",
                                  e.target.value,
                                  idx,
                                  "bgColor"
                                )
                              }
                              className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Hover Background Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={service.hoverBgColor || "#ffffff"}
                            onChange={(e) =>
                              handleChange(
                                "services",
                                "items",
                                e.target.value,
                                idx,
                                "hoverBgColor"
                              )
                            }
                            className="w-12 h-12 border-2 border-slate-200 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Projects Section
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={formData.projects?.heading || ""}
                    onChange={(e) =>
                      handleChange("projects", "heading", e.target.value)
                    }
                    placeholder="My Projects"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.projects?.description || ""}
                    onChange={(e) =>
                      handleChange("projects", "description", e.target.value)
                    }
                    placeholder="Projects description..."
                    rows="3"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>
            </div>

            {/* Project Items */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Project Items
              </h3>
              <div className="space-y-6">
                {formData.projects?.items?.map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={project.title || ""}
                          onChange={(e) =>
                            handleChange(
                              "projects",
                              "items",
                              e.target.value,
                              idx,
                              "title"
                            )
                          }
                          placeholder="E-commerce Mobile App"
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
                              "projects",
                              "items",
                              e.target.value,
                              idx,
                              "description"
                            )
                          }
                          placeholder="Project description..."
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
                              "projects",
                              "items",
                              e.target.value,
                              idx,
                              "link"
                            )
                          }
                          placeholder="https://example.com/project"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={project.tags?.join(", ") || ""}
                          onChange={(e) =>
                            handleChange(
                              "projects",
                              "items",
                              e.target.value
                                .split(",")
                                .map((tag) => tag.trim()),
                              idx,
                              "tags"
                            )
                          }
                          placeholder="Mobile, E-commerce, UI/UX"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
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
                              "projects",
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
                Contact Section
              </h3>
              <div className="space-y-4">
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
                    placeholder="Let's Work Together"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.contact?.description || ""}
                    onChange={(e) =>
                      handleChange("contact", "description", e.target.value)
                    }
                    placeholder="Contact description..."
                    rows="3"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Contact CTA
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    CTA Title
                  </label>
                  <input
                    type="text"
                    value={formData.contact?.cta?.title || ""}
                    onChange={(e) =>
                      handleChange("contact", "cta", { title: e.target.value })
                    }
                    placeholder="Ready to start your project?"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    CTA Description
                  </label>
                  <textarea
                    value={formData.contact?.cta?.description || ""}
                    onChange={(e) =>
                      handleChange("contact", "cta", {
                        description: e.target.value,
                      })
                    }
                    placeholder="Let's schedule a call and discuss your requirements"
                    rows="2"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.contact?.cta?.buttonText || ""}
                      onChange={(e) =>
                        handleChange("contact", "cta", {
                          buttonText: e.target.value,
                        })
                      }
                      placeholder="Schedule a Call"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Button URL
                    </label>
                    <input
                      type="text"
                      value={formData.contact?.cta?.buttonUrl || ""}
                      onChange={(e) =>
                        handleChange("contact", "cta", {
                          buttonUrl: e.target.value,
                        })
                      }
                      placeholder="mailto:example@email.com"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Items */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Contact Information
              </h3>
              <div className="space-y-4">
                {formData.contact?.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Type
                        </label>
                        <select
                          value={item.type || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "items",
                              e.target.value,
                              idx,
                              "type"
                            )
                          }
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="location">Location</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={item.label || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "items",
                              e.target.value,
                              idx,
                              "label"
                            )
                          }
                          placeholder="Email"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Value
                        </label>
                        <input
                          type="text"
                          value={item.value || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "items",
                              e.target.value,
                              idx,
                              "value"
                            )
                          }
                          placeholder="example@email.com"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          URL (for email/phone)
                        </label>
                        <input
                          type="text"
                          value={item.url || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "items",
                              e.target.value,
                              idx,
                              "url"
                            )
                          }
                          placeholder="mailto:example@email.com"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description || ""}
                          onChange={(e) =>
                            handleChange(
                              "contact",
                              "items",
                              e.target.value,
                              idx,
                              "description"
                            )
                          }
                          placeholder="Response within 24 hours"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
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
            {/* Logo */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Footer Logo
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Logo Text
                  </label>
                  <input
                    type="text"
                    value={formData.footer?.logo?.text || ""}
                    onChange={(e) =>
                      handleChange("footer", "logo", { text: e.target.value })
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
                      value={formData.footer?.logo?.accentColor || "#ff6300"}
                      onChange={(e) =>
                        handleChange("footer", "logo", {
                          accentColor: e.target.value,
                        })
                      }
                      className="w-16 h-16 border-2 border-slate-200 rounded-xl cursor-pointer"
                    />
                    <span className="text-sm font-mono text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
                      {formData.footer?.logo?.accentColor || "#ff6300"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Footer Links
              </h3>
              <div className="space-y-4">
                {formData.footer?.links?.map((link, idx) => (
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
                              "footer",
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
                              "footer",
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
                Social Media
              </h3>
              <div className="space-y-4">
                {formData.footer?.socials?.map((social, idx) => (
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
                              "footer",
                              "socials",
                              e.target.value,
                              idx,
                              "platform"
                            )
                          }
                          placeholder="Facebook"
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
                              "footer",
                              "socials",
                              e.target.value,
                              idx,
                              "url"
                            )
                          }
                          placeholder="https://facebook.com/username"
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
                              "footer",
                              "socials",
                              e.target.value,
                              idx,
                              "icon"
                            )
                          }
                          placeholder="FaFacebookF"
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Copyright
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Copyright Text
                </label>
                <input
                  type="text"
                  value={formData.footer?.copyright || ""}
                  onChange={(e) =>
                    handleChange("footer", "copyright", e.target.value)
                  }
                  placeholder="© 2024 Your Name. All Rights Reserved."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Footer Colors */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                Footer Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "bgColor", label: "Background", default: "#f8f8f8" },
                  { key: "textColor", label: "Text", default: "#545454" },
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
                          formData.footer?.colors?.[color.key] || color.default
                        }
                        onChange={(e) =>
                          handleChange("footer", "colors", {
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white ">
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
        <div className="lg:w-3/5 flex flex-col gap-6">
          {/* SIDEBAR NAVIGATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              Sections
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    activeSection === section.id
                      ? " border bg-black text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <span className="text-lg">{<section.icon />}</span>
                  <span className="font-medium text-sm">{section.name}</span>
                </button>
              ))}
            </nav>

            <button
              type="submit"
              form="template-form"
              disabled={uploading}
              className="w-full mt-6 border-2 font-semibold py-3 px-4 rounded-xl hover:bg-gray-700 hover:text-white transition-all duration-200 shadow-lg  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>Save All Changes</>
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
        <div className="lg:w-3/5 flex-shrink-0 border-t-1 border-l-1">
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
                <p className="text-slate-600 text-sm">
                  Real-time template preview
                </p>
              </div>
              <div className="p-4 bg-slate-50">
                {/* Scrollable Preview */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl overflow-auto bg-white shadow-sm max-h-[70vh]">
                  <UiUxDesigner placeholder={formData} />
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
