import Footer from "@/components/shared/Footer";
import TemplatesNavbar from "@/components/shared/TemplatesNavbar";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <TemplatesNavbar></TemplatesNavbar>
      <main className="flex-grow">{children}</main>
      <Footer></Footer>
    </div>
  );
}
