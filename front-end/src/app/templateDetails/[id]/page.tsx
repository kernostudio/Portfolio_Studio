import TemplateDetails from "@/components/modules/templatesPage/TemplateDetails";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function TemplateDetailsPage({ params }: PageProps) {
  // You can access params.id directly
  const { id } = await params;

  return (
    <div>
      {/* TemplateDetails is a client component */}
      <TemplateDetails id={id} />
    </div>
  );
}
