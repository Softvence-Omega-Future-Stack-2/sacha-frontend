import React from 'react';
import { useTranslation } from 'react-i18next';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center ">
    <div className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#1e90ff] mb-2 sm:mb-3">
      {value}
    </div>
    <div className="text-sm sm:text-base  text-[#1e90ff] font-normal">
      {label}
    </div>
  </div>
);

const StatsSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '2000+', label: t('stats.apartments_available') },
    { value: '€0', label: t('stats.agency_fees') },
    { value: '7 jours', label: t('stats.average_time') },
    { value: '48 heures', label: t('stats.guaranteed_response') }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white py-3 sm:py-4 md:py-6 mt-8 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;