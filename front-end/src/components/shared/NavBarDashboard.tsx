import Link from "next/link";
import { ImExit } from "react-icons/im";

export default function NavBarDashboard() {
  return (
    <nav className=" sticky top-0 bg-[#ffffff]  z-50  pt-5 pb-5">
      <div className="flex justify-between w-11/12 mx-auto">
        <div></div>
        <div>
          <h1 className="lg:text-[24px] text-xl">
            Portfolio <span className="font-bold">Studio</span>
          </h1>
        </div>
        <div>
          <Link
            className="
        flex items-center gap-3 text-xl"
            href="/templates"
          >
            Exit <ImExit></ImExit>
          </Link>
        </div>
      </div>
    </nav>
  );
}
