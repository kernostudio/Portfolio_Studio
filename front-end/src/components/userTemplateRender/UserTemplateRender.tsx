/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { templatesMap } from "../tampletsMap/TampletsMap";

export default function UserTemplateRenderer({
  userId,
  templateId, // This should actually be the userTemplateId
}: {
  userId: string;
  templateId: string;
}) {
  const axiosPublic = UseAxiosPublic();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !templateId) return;

    const fetchTemplate = async () => {
      try {
        const res = await axiosPublic.get(
          `/api/user-templates/${userId}/${templateId}`
        );
        if (res.data?.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user template:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [axiosPublic, userId, templateId]);

  if (loading) return <p>Loading template...</p>;
  if (!data) return <p>No template found for this user.</p>;

  const placeholders = data.template?.placeholders;
  const userPlaceholders = data.filledValues; // user customized data

  const slug = data.template?.slug.toLowerCase();
  const TemplateComponent = templatesMap[slug];

  if (!TemplateComponent)
    return <p>Template component not found for slug: {slug}</p>;

  // ✅ Pass both — base placeholders and user’s filled values
  return <TemplateComponent placeholder={userPlaceholders || placeholders} />;
}
