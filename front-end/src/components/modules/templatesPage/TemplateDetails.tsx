"use client";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { templatesMap } from "@/components/tampletsMap/TampletsMap";

interface TemplateViewerProps {
  id: string;
}

export default function TemplateDetails({ id }: TemplateViewerProps) {
  const axiosPublic = UseAxiosPublic();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/admin/templates/${id}`);
      return res.data.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading template...</p>;
  if (isError || !data)
    return <p className="text-center mt-10">Failed to load template.</p>;

  const TemplateComponent = templatesMap[data.slug?.toLowerCase()];

  return (
    <div>
      {TemplateComponent ? (
        <TemplateComponent placeholder={data.placeholders} />
      ) : (
        <p className="text-center mt-10 text-gray-600">
          No matching template found for slug: <b>{data.slug}</b>
        </p>
      )}
    </div>
  );
}
