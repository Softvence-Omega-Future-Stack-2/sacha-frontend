import PartnersSection from "../../components/Home/PartnersSection";
import Directory from "../../components/Rental/Directory";
import HeroSection from "../../components/Rental/HeroSection";
import { Landlords } from "../../components/Rental/Landlords";
import PremiumPartner from "../../components/Rental/PremiumPartner";
import StatsSection from "../../components/Rental/StatsSection";
import Tenant from "../../components/Rental/Tenant";
import WhyDoUs from "../../components/Rental/WhyDoUs";

export const Rental = () => {
  return (
    <>
      <div className="bg-[linear-gradient(180deg,rgba(37,99,235,0)_0%,rgba(37,99,235,0.20)_74.52%,rgba(37,99,235,0)_100%)] pb-8 px-4 sm:px-6 lg:px-8" >
        <HeroSection />
        <StatsSection />
      </div>
      <WhyDoUs />
      <Tenant />
      <Landlords />
      <Directory />
      <PartnersSection />
      <PremiumPartner />
    </>
  );
};
