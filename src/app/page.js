import Banner from "@/components/Banner";
import PopularRoutes from "@/components/PopularRoutes";
import Testimonial from "@/components/Testimonial";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Banner />
      <PopularRoutes />
      <WhyChooseUs />
      <Testimonial />
      <Toaster />
    </div>
  );
}
