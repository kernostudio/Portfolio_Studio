"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="w-11/12 mx-auto mt-10 ">
      <div className="flex justify-center ">
        <div>
          <h1 className="lg:text-5xl md:text-2xl text-xl text-center">
            Create <span className="font-bold">Stunning</span>
          </h1>
          <h1 className="lg:text-5xl md:text-2xl text-center mt-3 text-xl">
            <span className="font-bold">Portfolios</span> in Minutes
          </h1>
          <p className="text-center mt-3 md:text-[18px] ">
            Browse Stunning templates by category, customize,with{" "}
            <br className="hidden md:block" /> simple edits,and publish with one
            click. No coding or design <br className="hidden md:block" /> skills
            required.
          </p>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="relative  lg:w-[48%] ">
          <div className="relative w-full lg:w-[350px] h-[300px] bg-white rounded-2xl   p-6 z-10 mt-6 lg:mt-28">
            <h2 className="text-lg font-semibold text-gray-400">Name</h2>
            <hr className="my-2 text-gray-200" />

            <section className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
                Professional Summary
              </h3>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
              </div>
            </section>

            <section className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
                Skill
              </h3>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
                Experience
              </h3>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
              </div>
            </section>
          </div>

          <div className="relative w-full lg:w-auto bg-white rounded-2xl shadow p-6 z-20 mt-6 lg:-mt-[355px] h-[420px] lg:ml-56">
            <h2 className="text-lg font-semibold text-gray-600">
              Ariful Islam
            </h2>
            <div className="flex gap-1 my-2">
              <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
            </div>

            <section className="mb-4">
              <h3 className="text-xs font-bold pt-1 text-gray-800 uppercase mb-2">
                Professional Summary
              </h3>
              <p className="text-[10px] inline-block px-1">
                <span className="bg-blue-200">
                  Motivated and dedicated individual seeking opportunities to
                </span>{" "}
                <span className="bg-blue-200">
                  apply skills and grow professionally. Strong work ethic with
                  the
                </span>{" "}
                <span className="bg-blue-200">
                  ability to adapt to new challenges.
                </span>
              </p>
            </section>

            <section className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 uppercase mb-2">
                Skill
              </h3>
              <p className="text-xs">
                Java, Python, Go, Apache Kafka, RaviitMQ, Kubernetes, CI/CD with{" "}
                <span className="bg-blue-200">
                  Jenkins, Prometheus, Node.js Typescript, Multimedia, HLS
                </span>
              </p>
            </section>

            <section>
              <h3 className="text-xs font-bold text-gray-800 uppercase mb-2">
                Experience
              </h3>
              <p className="text-xs">
                Once you have your refined resume, explore our job board and
                instantly get hundreds of job matches where you’ll be the top
                applicant!{" "}
                <span className="bg-blue-200">Create, edit, and apply</span> -
                all from one place!
              </p>
              <div className="space-y-1 pt-3">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
              </div>
            </section>

            <img
              src="https://i.ibb.co.com/pBhQzDxY/Vector-1.png"
              alt="line indicator"
              className="absolute hidden lg:block top-3 -left-40 w-[150px] h-[43px]"
            />
            <img
              src="https://i.ibb.co.com/bRDX8pNF/doublestar.png"
              alt="star icon"
              className="absolute -top-5 -left-5 w-[40px] h-[40px]"
            />
            <div className="absolute bottom-10 h-[32px] right-0 bg-white shadow-md px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-200 z-40">
              <img
                src="https://i.ibb.co.com/bRDX8pNF/doublestar.png"
                alt="icon"
                className="w-4 h-4"
              />
              <span className="font-medium text-xs">Summary Enhanced</span>
            </div>

            <div className="absolute bottom-0 h-[32px] right-0 bg-white shadow-md px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-200 z-40">
              <img
                src="https://i.ibb.co.com/bRDX8pNF/doublestar.png"
                alt="icon"
                className="w-4 h-4"
              />
              <span className="font-medium text-xs">
                Relevant Skills Highlighted
              </span>
            </div>

            <div className="absolute -bottom-9 h-[32px] right-0 bg-white shadow-md px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-200 z-40">
              <img
                src="https://i.ibb.co.com/bRDX8pNF/doublestar.png"
                alt="icon"
                className="w-4 h-4"
              />
              <span className="font-medium text-xs">
                Recent Work Experience Enhanced
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 lg:mt-0"></div>
      <Link
        href="/templates"
        className="bg-black lg:ml-64  h-[46px] text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 "
      >
        Start Building Portfolio
      </Link>
    </div>
  );
}
