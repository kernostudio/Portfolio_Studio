"use client";
import { TextFade } from "@/components/shared/TextFade";
import { motion } from "framer-motion";

export default function Reviews() {
  const reviews = [
    {
      text: "omg i cannot believe i am getting a interview after using this. the recommendations is well thought off. highly recommend everyone to use this website.",
      name: "Michelle V.",
      role: "Sr. Digital Marketing Manager",
      avatar: "https://i.ibb.co.com/C36wY2qM/michelb.png",
    },
    {
      text: "omg i cannot believe i am getting a interview after using this. the recommendations is well thought off. highly recommend everyone to use this website.",
      name: "Shiva V.",
      role: "Senior Recruiter",
      avatar: "https://i.ibb.co.com/Rp3g9wgF/top.png",
    },
    {
      text: "The custom resume feature saved me so much time and effort. It made sure my resume matched the job descriptions perfectly. I am gonna use it for every job I apply.",
      name: "Ken D.",
      role: "Senior Recruiter",
      avatar: "https://i.ibb.co.com/5pRSKxH/shiva.png",
    },
    {
      text: "Really easy to use and understand. I loved how I could take direct action on suggestions and not just learn about them.",
      name: "Michelle V.",
      role: "Sr. Digital Marketing Manager",
      avatar: "https://i.ibb.co.com/2Yf7t7qQ/kend.png",
    },
    {
      text: "omg i cannot believe i am getting a interview after using this. the recommendations is well thought off. highly recommend everyone to use this website.",
      name: "Bob V.",
      role: "Sr. Digital Marketing Manager",
      avatar: "https://i.ibb.co.com/C36wY2qM/michelb.png",
    },
  ];

  function ReviewsScroller() {
    const REPETITIONS = 30;
    const reviewLoop = [];

    for (let i = 0; i < REPETITIONS; i++) {
      for (const review of reviews) {
        reviewLoop.push({ ...review });
      }
    }

    return (
      <div className="relative h-[450px] overflow-hidden mt-8">
        <motion.div
          className="flex flex-col gap-4"
          animate={{ y: [-0, -reviews.length * 180] }} // scroll distance = one set of reviews
          transition={{
            duration: reviews.length * 6, // slower for smoother scroll
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {reviewLoop.map((review, idx) => (
            <div
              key={idx}
              className="max-w-2xl mx-auto bg-white shadow-sm rounded-2xl p-6"
            >
              <img src="https://i.ibb.co.com/QvsbjmXb/quote.png" alt="" />
              <p className="text-[16px] text-center mt-2">{review.text}</p>
              <div className="flex items-center gap-3 mt-5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">{review.name}</span>{" "}
                  <span className="text-gray-500">/ {review.role}</span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div id="blog" className="w-10/12 mx-auto mt-20">
      <TextFade direction="up" staggerChildren={0.15}>
        <h1 className=" text-xl text-center  lg:text-[36px]">
          Voice From <span className="font-bold">the world</span>
        </h1>
        <p className="lg:text-[18px] text-center mt-5 text-sm">
          What our users say after using Portfolio Studio and how <br /> it
          helped them improve their Resume
        </p>
      </TextFade>

      <div className="md:grid md:grid-cols-3 mt-10 pb-10 bg-gradient-to-r from-[#f9fbff] via-[#e3f3ff] to-[#f9fbff] justify-between">
        <div className=" flex justify-center items-center">
          <div className="relative w-80 h-80 mx-auto mt-5">
            <div className="absolute inset-0 m-auto w-[120px] h-[120px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/p92DXVQ/middle.png"
                alt="Center"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-20 left-14 w-[42px] h-[42px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/Rp3g9wgF/top.png"
                alt="Top Left"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-10 right-20 w-[60px] h-[60px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/W4h4nJkM/topright.png"
                alt="Top Right"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-10 left-20 w-[60px] h-[60px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/GQxJDTtK/leftbottom.png"
                alt="Bottom Left"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-20 right-14 w-[42px] h-[42px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/bRCLj7hv/rightbottom.png"
                alt="Bottom Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <ReviewsScroller />
        </div>
      </div>
    </div>
  );
}
