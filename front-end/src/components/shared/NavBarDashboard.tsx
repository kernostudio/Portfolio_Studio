import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function NavBarDashboard() {
  return (
    <nav className=" sticky top-0 bg-[#ffffff]  z-50  pt-5 pb-5">
      <div className="flex justify-center items-center w-11/12 mx-auto">
        <div></div>
        <div>
          <h1 className="lg:text-[24px] text-xl">
            Portfolio <span className="font-bold">Studio</span>
          </h1>
        </div>
        {/* <div>
          <Link
            className="
        flex items-center gap-3 text-xl"
            href="/templates"
          >
            Exit <GoArrowLeft></GoArrowLeft>
          </Link>
        </div> */}
      </div>
    </nav>
  );
}
