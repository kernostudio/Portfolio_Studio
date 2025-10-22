"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TextFade } from "@/components/shared/TextFade";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why should I use this Portfolio Studio?",
      answer: `Our Portfolio Studio helps you create a professional portfolio without writing a single line of code.

1. You can easily customize text, colors, and images directly from our editor — no technical skills needed.

2. It saves hours of design and setup time with pre-built, modern templates optimized for all devices.

3. You get full creative control — just edit, preview, and publish instantly to showcase your skills online.`,
    },
    {
      question: "What makes this Portfolio Studio better than others?",
      answer:
        "It’s built for simplicity and flexibility. Unlike other tools, our platform combines modern templates, real-time editing, and seamless publishing — all in one place. You can design your dream portfolio visually, without touching any code.",
    },
    {
      question: "Can I edit or update my portfolio anytime?",
      answer:
        "Yes! You can edit, update, or even switch templates anytime. Your changes are saved instantly, allowing you to keep your portfolio fresh as your skills and projects grow.",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-10/12 mt-28 mx-auto   space-y-4">
      <TextFade direction="up" staggerChildren={0.15}>
        <h1 className="font-bold text-center lg:text-[36px] text-xl">
          Frequently <br /> Asked Questions
        </h1>
      </TextFade>
      {/* <div className="w-full max-w-lg  mx-auto mt-6 mb-10">
        <input
          type="text"
          placeholder="Search your questions"
          className="w-full px-4 py-2 rounded-full  bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
        />
      </div> */}
      <div className="bg-gradient-to-r mt-10 from-[#f9fbff] via-[#e3f3ff] to-[#f9fbff] space-y-5">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            layout
            transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
            className="bg-white rounded-xl p-5 cursor-pointer transition"
            onClick={() => toggleFAQ(index)}
          >
            <motion.div layout className="flex justify-between items-center">
              <h3 className="font-semibold text-[18px] md:text-[20px] text-gray-800">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 border-2 rounded-full text-gray-900" />
              ) : (
                <ChevronDown className="w-5 h-5 border-2 rounded-full text-gray-900" />
              )}
            </motion.div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-3 text-gray-700 w-full md:w-3/5 text-[16px] text-start whitespace-pre-line overflow-hidden"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
