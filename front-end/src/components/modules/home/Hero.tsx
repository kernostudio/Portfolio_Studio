"use client";

import Image from "next/image";
import buttonIcon from "../../../../public/img/Group.png";
import heroImg from "../../../../public/img/image 206.png";
import user1 from "../../../../public/img/user.png";
import user2 from "../../../../public/img/user (1).png";
import user3 from "../../../../public/img/user (2).png";
import user4 from "../../../../public/img/user (3).png";

export default function Hero() {
  const reviewers = [user1, user2, user3, user4];
  return (
    <div className="w-11/12 mx-auto mt-20">
      <div className="lg:flex justify-between gap-4">
        <div className="lg:w-1/2">
          <h1 className="md:text-[68px] text-3xl font-medium leading-tight">
            Create <span className="text-[#A78BFA]">Stunning</span> <br />
            <span className="text-[#7C3AED]">Portfolios</span> in <br />
            Minutes
          </h1>

          <p className="text-[16px] text-sm mt-5 font-light">
            Browse stunning templates by category, customize with simple edits,
            <br /> and publish with one click. No coding or design skills
            required.
          </p>
          <div className="mt-5">
            <button className="flex justify-center gap-1 md:h-[48px] lg:w-[206px] items-center bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] text-white p-2 rounded-full lg:text-xl hover:bg-purple-600 transition">
              Start Building Free
              <Image
                className="rounded-full bg-white w-5 h-5"
                src={buttonIcon}
                alt="icon"
              ></Image>
            </button>
          </div>
          <div className="flex flex-col  space-y-4 mt-10">
            {/* Stars */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431L24 9.748l-6 5.849L19.335 24 12 20.201 4.665 24 6 15.597 0 9.748l8.332-1.73z" />
                </svg>
              ))}
            </div>

            <p className=" text-gray-700 text-sm lg:text-base">
              Over 1K+ Client Review’s
            </p>

            <div className="flex -space-x-3">
              {reviewers.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Reviewer ${idx + 1}`}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-9 lg:mt-20 lg:w-1/2 relative rounded-2xl overflow-hidden">
          {/* Image */}
          <Image
            src={heroImg}
            alt="computer"
            className="w-full lg:h-[498px] object-cover"
          />

          <div className="absolute bottom-0 left-0 w-full  border-t border-b rounded-b-2xl rounded-t-2xl bg-white/5 backdrop-blur-xs text-white p-4 flex justify-between">
            <div className="">
              <h3 className="font-semibold">10 years</h3>
              <p className="lg:text-sm text-xs">Global Impact</p>
            </div>
            <div className="">
              <h3 className="font-semibold">9 years</h3>
              <p className="lg:text-sm text-xs">Creative Solutions</p>
            </div>
            <div className="">
              <h3 className="font-semibold">7 years</h3>
              <p className="lg:text-sm text-xs">Brand Strategy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
