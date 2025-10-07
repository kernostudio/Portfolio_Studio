import { useRouter } from "next/navigation";

interface TemplateCardProps {
  template: {
    id: string;
    title: string;
    previewUrl?: string;
  };
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition"
      onClick={() => router.push(`/template/${template.id}`)}
    >
      <img
        src={template.previewUrl || "/placeholder.png"}
        alt={template.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{template.title}</h3>
      </div>
    </div>
  );
}
