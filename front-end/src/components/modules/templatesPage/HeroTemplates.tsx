import { TextFade } from "@/components/shared/TextFade";
import React from "react";

export default function HeroTemplates() {
  return (
    <div className="pt-16 w-11/12 mx-auto">
      <TextFade direction="up" staggerChildren={0.15}>
        <h1 className="font-bold text-center text-xl md:text-[40px]">
          Portfolio Templates
        </h1>
        <p className="text-center mt-5">
          {" "}
          Browse our collection of portfolio templates to quickly showcase{" "}
          <br className="hidden md:block" /> your work. Simple, professional,
          and ready to customize.
        </p>
      </TextFade>
    </div>
  );
}
