import ExceptionalWork from "@/components/modules/home/ExceptionalWork";
import Features from "@/components/modules/home/Features";
import Hero from "@/components/modules/home/Hero";
import HowItWorks from "@/components/modules/home/HowItWorks";

export default function Homepage() {
  return (
    <div>
      <Hero></Hero>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <ExceptionalWork></ExceptionalWork>
    </div>
  );
}
