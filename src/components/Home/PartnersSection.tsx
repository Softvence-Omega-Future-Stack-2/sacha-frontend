import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo1 from "../../assets/logo.png";
import logo2 from "../../assets/logo1.png";
import logo3 from "../../assets/logo2.png";
import logo4 from "../../assets/logo3.png";
import logo5 from "../../assets/logo4.png";
import logo6 from "../../assets/logo5.png";

const PartnersSection: React.FC = () => {
  const { t } = useTranslation();
  const [isPaused] = useState(false);

  const partners = [
    {
      name: 'Partner 1',
      logo: <img src={logo1} alt="partner1" className="h-12 object-contain" />
    },
    {
      name: 'Partner 2',
      logo: <img src={logo2} alt="partner2" className="h-12 object-contain" />
    },
    {
      name: 'Partner 3',
      logo: <img src={logo3} alt="partner3" className="h-12 object-contain" />
    },
    {
      name: 'Partner 4',
      logo: <img src={logo4} alt="partner4" className="h-12 object-contain" />
    },
    {
      name: 'Partner 5',
      logo: <img src={logo5} alt="partner5" className="h-12 object-contain" />
    },
    {
      name: 'Partner 6',
      logo: <img src={logo6} alt="partner6" className="h-12 object-contain" />
    },
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full bg-white mb-16 overflow-hidden">
      <div>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <button className="py-2 px-8 bg-[#2563EB1A] rounded-full text-sm md:text-base">
            {t('partners.badge')}
          </button>
        </div>

        {/* Heading */}
        <h1 className=" sm:text-2xl lg:text-4xl text-center text-[#061251] font-dm-sans text-3xl font-semibold leading-[120%] mb-12">
          {t('partners.title_prefix')} <span className="font-normal text-[#061251]  larken-font   leading-[120%]">{t('partners.title_suffix')}</span>
        </h1>

        {/* Slider Container */}
        <div
          className="relative"
    
        >
          <div className="overflow-hidden">
            <div
              className={`flex gap-0 ${isPaused ? '' : 'animate-scroll'}`}
              style={{
                width: 'fit-content'
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="shrink-0 bg-white border border-gray-200 px-8 py-16 w-64 h-32 flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
                >
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>

  
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${(partners.length * (256 + 32))}px);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

     
      `}</style>
    </div>
  );
};

export default PartnersSection;
