import Image from "next/image";
import DownloadForm from "@/components/DownloadForm";
import HowToUse from "@/components/HowToUse";
import AboutUs from "@/components/AboutUs";
import FAQs from "@/components/FAQs";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer"
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
    
      {/* Section 1: DownloadForm */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/bg-main.jpg')",
        }}
      >
        <div className="w-full max-w-2xl p-4 space-y-10 bg-black/50 rounded-lg">
          <DownloadForm />
        </div>
      </section>

      {/* Gradient Transition */}
  <div className="absolute  bg-gradient-to-b from-transparent via-white to-white opacity-10" />

      {/* Section 2: HowToUse */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/bg-3.jpg')",
        }}
      >
        <div className="w-full max-w-2xl p-4 space-y-10 bg-white/80 rounded-lg">
          <HowToUse />
        </div>
      </section>

      {/* Gradient Transition */}
  <div className="absolute  bg-gradient-to-b from-transparent via-white to-white opacity-10" />

      {/* Section 3: AboutUs */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/bg-main.jpg')",
        }}
      >
        <div className="w-full max-w-5xl p-4 space-y-10  rounded-lg">
          <AboutUs />
        </div>
      </section>

      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/bg-2.jpg')",
        }}
      >
        <div className="w-full max-w-5xl p-4 bg-white/80  space-y-10  rounded-lg">
          <FAQs />
        </div>
      </section>
   <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/bg-4.jpg')",
        }}
      >
        <div className="w-full max-w-5xl p-4 space-y-10 bg-white/80 rounded-lg">
          <Footer />
        </div>
      </section>

      
      {/* Toasts */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
