import AllTemplates from "@/components/modules/templatesPage/AllTemplates";
import HeroTemplates from "@/components/modules/templatesPage/HeroTemplates";

export default function TemplatesPage() {
  return (
    <div className="bg-gradient-to-r from-[#f9fbff] via-[#e3f3ff] to-[#f6f7ff]">
      <HeroTemplates></HeroTemplates>
      <AllTemplates></AllTemplates>
    </div>
  );
}
