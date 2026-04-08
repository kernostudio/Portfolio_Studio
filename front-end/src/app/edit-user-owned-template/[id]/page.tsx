import TemplateCustomizeUserPlaceholder from "@/components/modules/templatesPage/TemplateCustomizeUserPlaceholder";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function userOwnTemplateCustomizePage({
  params,
}: PageProps) {
  // You can access params.id directly
  const { id } = await params;

  return (
    <div>
      <ProtectedRoute>
        <TemplateCustomizeUserPlaceholder
          id={id}
        ></TemplateCustomizeUserPlaceholder>
      </ProtectedRoute>
    </div>
  );
}
