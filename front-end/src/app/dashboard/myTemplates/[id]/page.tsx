import MyTemplates from "@/components/modules/dashboard/myTemplatesUser/MyTemplates";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function myTemplatesPage({ params }: PageProps) {
  // You can access params.id directly
  const { id } = await params;

  return (
    <div>
      <MyTemplates id={id}></MyTemplates>
    </div>
  );
}
