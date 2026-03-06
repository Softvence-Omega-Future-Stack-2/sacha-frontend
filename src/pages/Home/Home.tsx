import HeroSection from "../../components/Home/HeroSection";
import StatsSection from "../../components/Home/StatsSection";
import FranceApartments from "../../components/Home/FranceApartments";
import WhyUsSection from "../../components/Home/WhyUsSection";
import TenantSection from "../../components/Home/TenantSection";
import SuccessPillars from "../../components/Home/SuccessPillars";
import PartnersSection from "../../components/Home/PartnersSection";
import WorksSection from "../../components/Home/WorksSection";
import FeaturedApartments from "../../components/Home/FeaturedSection";
import HeroFeaturesSection from "../../components/Home/HeroFeaturesSection";
import StrongTenantSection from "../../components/Home/StrongTenantSection";
import TrustpilotTestimonials from "../../components/Home/testimonialsSection";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const userRole =
    typeof window !== "undefined"
      ? localStorage.getItem("role") || "tenant"
      : "tenant";
  return (
    <>

      <div
        className="pb-10 lg:px-8 px-4"
        style={{
          background:
            "linear-gradient(180deg, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0.5) 50%, rgba(37, 99, 235, 0) 100%)",
        }}
      >
        <HeroSection />
        <StatsSection />
      </div>



      <FeaturedApartments />
      <FranceApartments />
      <WhyUsSection />
      <TenantSection />
      <SuccessPillars />
      <PartnersSection />
      <WorksSection />
      <HeroFeaturesSection />
      <StrongTenantSection />
      <TrustpilotTestimonials />
    </>
  );
};

export default Home;
