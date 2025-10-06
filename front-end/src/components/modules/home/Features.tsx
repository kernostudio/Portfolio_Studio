import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import img from "../../../../public/img/image.png";
export default function Features() {
  return (
    <div className="w-11/12 mx-auto mt-32">
      <h1 className="font-medium text-xl md:text-[46px]">
        Everything You <br /> Need to Stand Out
      </h1>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* First Row */}
        <div className="lg:col-span-2 h-[350px] border border-gray-300 bg-[#F6F8FC] rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-xl transition-shadow duration-300">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              AI-Powered Templates
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              Choose from 50+ professionally designed <br /> templates optimized
              for your industry and <br /> style preferences.
            </p>
          </div>
          <div>
            <Image height={300} src={img} alt="sideImg" />
          </div>
        </div>

        <div className="lg:col-span-1 border border-gray-300 bg-[#F6F8FC] rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Edit & Publish
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            Easily edit your portfolio content and publish it online with one
            click—no technical skills required.
          </p>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500 text-purple-500 hover:bg-purple-50 transition-colors duration-300">
            <FiArrowUpRight />
          </button>
        </div>

        {/* Second Row */}
        <div className="border h-[350px] border-gray-300 bg-[#F6F8FC] rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Mobile Responsive
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            All portfolios are automatically optimized for desktop, tablet, and
            mobile devices.
          </p>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500 text-purple-500 hover:bg-purple-50 transition-colors duration-300">
            <FiArrowUpRight />
          </button>
        </div>

        <div className="border h-[350px] border-gray-300 bg-[#F6F8FC] rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            SEO Optimized
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            Built-in SEO tools to help your portfolio rank higher in search
            results and get discovered.
          </p>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500 text-purple-500 hover:bg-purple-50 transition-colors duration-300">
            <FiArrowUpRight />
          </button>
        </div>

        <div className="border h-[350px] border-gray-300 bg-[#F6F8FC] rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Custom Branding
          </h3>
          <p className="text-gray-500 mb-4 text-sm">
            Personalize your portfolio with your logo, brand colors, and fonts
            for a unique professional identity.
          </p>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500 text-purple-500 hover:bg-purple-50 transition-colors duration-300">
            <FiArrowUpRight />
          </button>
        </div>
      </div>
    </div>
  );
}
