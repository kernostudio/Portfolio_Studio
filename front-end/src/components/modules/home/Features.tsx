import { TextFade } from "@/components/shared/TextFade";

export default function Features() {
  const items = [
    { title: "90%", subtitle: "Job Interview Rate" },
    { title: "50K+", subtitle: "CVs Created" },
    { title: "25+", subtitle: "Professional Templates" },
    { title: "4.9", subtitle: "User Rating" },
  ];

  return (
    <div className="w-11/12 mx-auto pt-32">
      <div>
        <TextFade direction="up" staggerChildren={0.15}>
          <h1 className="md:text-[40px] text-xl text-center">
            Why Choose <span className="font-semibold">Portfolio</span>{" "}
            <span className="font-bold">Studio</span>
          </h1>
          <p className="text-center mt-5 md:text-xl ">
            Our users report a 90% higher chance of getting job interviews with{" "}
            <br /> portfolios created using Portfolio Studio templates.
          </p>
        </TextFade>
      </div>

      <div className="flex justify-center">
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 justify-center">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative group rounded-3xl w-[154px] h-[154px] bg-[#e9f4ff] overflow-hidden"
            >
              {/* Outer SVG border */}
              <svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                {/* Base border */}
                <rect
                  x="4"
                  y="4"
                  width="152"
                  height="152"
                  rx="20"
                  ry="20"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="2"
                />

                {/* Animated ray border */}
                <rect
                  className="ray-border"
                  x="4"
                  y="4"
                  width="152"
                  height="152"
                  rx="20"
                  ry="20"
                  fill="none"
                  stroke="#23A2FC80"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              {/* Card content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                <div className="bg-white h-1 w-2/3 mb-4 mt-2 rounded"></div>
                <p className="text-2xl text-center font-bold">{item.title}</p>
                <p className="text-gray-600 text-center text-sm mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
