import Faq from "@/components/modules/home/FAQ";
import Features from "@/components/modules/home/Features";
import Hero from "@/components/modules/home/Hero";
import Reviews from "@/components/modules/home/Reviews";

export default function Homepage() {
  return (
    <div>
      <Hero></Hero>
      <Features></Features>
      <Reviews></Reviews>
      <Faq></Faq>
    </div>
  );
}
