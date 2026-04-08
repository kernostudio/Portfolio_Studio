"use client";

import { TextFade } from "@/components/shared/TextFade";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const router = useRouter();

  function ResumeCardSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });

    // Rotate & move slightly based on scroll
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    // Add spring for smoothness
    const smoothRotateY = useSpring(rotateY, { stiffness: 60, damping: 15 });
    const smoothRotateX = useSpring(rotateX, { stiffness: 60, damping: 15 });
    const smoothY = useSpring(y, { stiffness: 60, damping: 15 });
    const smoothScale = useSpring(scale, { stiffness: 60, damping: 15 });

    return (
      <div ref={ref} className="flex justify-center perspective-1000">
        <motion.div
          style={{
            rotateY: smoothRotateY,
            rotateX: smoothRotateX,
            y: smoothY,
            scale: smoothScale,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="relative lg:w-[48%]"
        >
          {/* ======= LEFT PLACEHOLDER CARD ======= */}
          <div className="relative w-full lg:w-[350px] h-[300px] bg-white rounded-2xl p-6 z-10 mt-6 lg:mt-28 shadow">
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

          {/* ======= MAIN CARD ======= */}
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
                Java, Python, Go, Apache Kafka, RabbitMQ, Kubernetes, CI/CD with{" "}
                <span className="bg-blue-200">
                  Jenkins, Prometheus, Node.js, Typescript, Multimedia, HLS
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
                <span className="bg-blue-200">Create, edit, and apply</span> —
                all from one place!
              </p>
              <div className="space-y-1 pt-3">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
              </div>
            </section>

            {/* Floating icons */}
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
        </motion.div>
      </div>
    );
  }

  function AnimatedButton() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
      <div className="pt-16 lg:pt-0 flex justify-center lg:justify-start lg:ml-64">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/templates"
              className="bg-black h-[46px] text-white px-5 py-2 rounded-xl font-medium hover:bg-gray-800"
            >
              Start Building Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto pt-10 bg-gradient-to-r from-[#f9fbff] via-[#e3f3ff] to-[#f9fbff] ">
      <div className="flex justify-center ">
        <div>
          <TextFade direction="up" staggerChildren={0.15}>
            <h1 className="lg:text-5xl md:text-2xl text-xl text-center">
              Create <span className="font-bold">Stunning</span>
            </h1>
            <h1 className="lg:text-5xl md:text-2xl text-center mt-3 text-xl">
              <span className="font-bold">Portfolios</span> in Minutes
            </h1>
            <p className="text-center mt-3 md:text-[18px] ">
              Browse Stunning templates by category, customize,with{" "}
              <br className="hidden md:block" /> simple edits,and publish with
              one click. No coding or design <br className="hidden md:block" />{" "}
              skills required.
            </p>
          </TextFade>
        </div>
      </div>

      <ResumeCardSection />

      {/* <div className="pt-16 lg:pt-0"></div>
      <Link
        href="/templates"
        className="bg-black lg:ml-64  h-[46px] text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-700 "
      >
        Start Building Portfolio
      </Link> */}
      <AnimatedButton />
    </div>
  );
}
