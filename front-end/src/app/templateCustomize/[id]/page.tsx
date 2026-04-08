import TemplateCustomize from "@/components/modules/templatesPage/TemplateCustomize";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function TemplateCustomizePage({ params }: PageProps) {
  // You can access params.id directly
  const { id } = await params;

  return (
    <div>
      <ProtectedRoute>
        <TemplateCustomize id={id}></TemplateCustomize>
      </ProtectedRoute>
    </div>
  );
}
