import Banner from "@/components/Banner";
import PopularRoutes from "@/components/PopularRoutes";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <PopularRoutes />
      <WhyChooseUs />
    </div>
  );
}
