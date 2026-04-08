"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Category {
  name?: string;
}

interface Template {
  id: string;
  title: string;
  description: string;
  templateImgUrl?: string;
  category?: Category;
}

interface TemplateCardProps {
  template: Template;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function TemplateCard({ template, user }: TemplateCardProps) {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/templateDetails/${id}`);
  };

  return (
    <div
      key={template.id}
      className="p-4 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition"
    >
      {template.templateImgUrl && (
        <div className="w-full h-40 border border-gray-200 relative mb-4 rounded-xl overflow-hidden">
          <Image
            src={template.templateImgUrl}
            alt={template.title}
            fill
            className="object-cover "
          />
        </div>
      )}

      <h3 className="text-lg font-semibold">{template.title}</h3>
      <div className="bg-gray-200 rounded-xl w-fit mb-2 px-2 mt-3">
        <p className="text-sm   ">
          {template.category?.name || "Uncategorized"}
        </p>
      </div>
      <p className="text-gray-600 text-sm">{template?.description}</p>

      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={() => handleCardClick(template.id)}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          See Preview & Details
        </button>

        <button
          onClick={() =>
            user
              ? router.push(`/templateCustomize/${template.id}`)
              : router.push(
                  `/templates/signin?redirectTo=/templateCustomize/${template.id}`
                )
          }
          className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          Use Template
        </button>
      </div>
    </div>
  );
}
