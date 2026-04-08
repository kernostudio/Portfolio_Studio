import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar></Navbar>
      <main className="flex-grow pb-28">{children}</main>
      <Footer></Footer>
    </div>
  );
}
