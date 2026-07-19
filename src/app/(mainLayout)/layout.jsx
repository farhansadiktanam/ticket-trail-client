import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-full flex flex-col bg-[#080c16] text-[#f3f4f6]">
      <Navbar />
      <main className="grow flex flex-col">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
