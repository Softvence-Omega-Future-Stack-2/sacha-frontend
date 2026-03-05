import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const WhyUsSection: React.FC = () => {
  const { t } = useTranslation();

  const simplifyFeatures = [
    t('why_us.simplify_1'),
    t('why_us.simplify_2'),
    t('why_us.simplify_3'),
    t('why_us.simplify_4'),
    t('why_us.simplify_5'),
    t('why_us.simplify_6')
  ];

  const protectionFeatures = [
    t('why_us.protect_1'),
    t('why_us.protect_2'),
    t('why_us.protect_3'),
    t('why_us.protect_4'),
    t('why_us.protect_5'),
    t('why_us.protect_6')
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl text-center text-[#1a1a4d] mb-16 larken-font">
          {t('why_us.title')}
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Card - What Hello Appart simplifies */}
          <div className="bg-[#f8f9fc] rounded-3xl p-6 md:p-8 lg:p-10">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="px-6 py-2.5 border-2 border-[#4d9fff] text-[#4d9fff] rounded-full text-sm font-medium">
                {t('why_us.badge_simplify')}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[#061251] md:text-3xl mb-20 font-dm-sans text-2xl font-normal leading-[120%]">
              {t('why_us.simplify_title_prefix')} <span className="text-[#1077FF] larken-font text-3xl font-light leading-[120%]">{t('why_us.simplify_title_suffix')}</span> {t('why_us.simplify_title_end')}
            </h2>

            {/* Features List */}
            <div className="space-y-3">
              {simplifyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#6b7a99] flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white stroke-3" />
                  </div>
                  <span className="text-gray-900 text-base leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card - What protects you with Hello Appart */}
          <div className="bg-[#f8f9fc] rounded-3xl p-6 md:p-8 lg:p-10">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="px-6 py-2.5 border-2 border-[#4d9fff] text-[#4d9fff] rounded-full text-sm font-medium">
                {t('why_us.badge_protect')}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl mb-20 text-gray-900">
              {t('why_us.protect_title_prefix')} <span className="text-[#1077FF] larken-font text-3xl font-light leading-[120%]">{t('why_us.protect_title_suffix')}</span>
            </h2>

            {/* Features List */}
            <div className="space-y-3">
              {protectionFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#6b7a99] flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white stroke-3" />
                  </div>
                  <span className="text-[#061251] text-base leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;