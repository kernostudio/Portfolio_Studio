import UserTemplateRenderer from "@/components/userTemplateRender/UserTemplateRender";
import { use } from "react";

// ✅ Server component (can read params)
export default async function UserTemplatePage({
  params,
}: {
  params: { userId: string; templateId: string };
}) {
  const { userId, templateId } = await params;

  return (
    <div className="min-h-screen">
      {/* ✅ Pass both IDs as props */}
      <UserTemplateRenderer userId={userId} templateId={templateId} />
    </div>
  );
}
