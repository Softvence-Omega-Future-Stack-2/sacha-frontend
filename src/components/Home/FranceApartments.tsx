import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import city1 from '../../assets/city1.png'
import city2 from '../../assets/city2.png'
import city3 from '../../assets/city3.png'
import city4 from '../../assets/city4.png'
import city5 from '../../assets/city5.png'
import city6 from '../../assets/city6.jpg'

interface CityCardProps {
    name: string;
    imageUrl: string;
    isExpanded: boolean;
    onHover: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ name, imageUrl, isExpanded, onHover }) => {
    return (
        <div
            className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${isExpanded ? 'flex-2' : 'flex-[0.5]'
                }`}
            onMouseEnter={onHover}
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="relative h-full flex items-center justify-center">
                <div
                    className={`absolute left-0 right-0 bg-[#2563EB4D] backdrop-blur-[17.1px] py-12 md:py-24 transition-opacity duration-500 ${isExpanded ? 'opacity-80' : 'opacity-0'
                        }`}
                />

                <h3 className="relative text-white text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide flex items-center gap-2 z-10">
                    {name}
                    {name === 'PARIS' && (
                        <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 17L17 7M17 7H7M17 7V17"
                            />
                        </svg>
                    )}
                </h3>
            </div>
        </div>
    );
};

const FranceApartments: React.FC = () => {
    const { t } = useTranslation();
    const [expandedCity, setExpandedCity] = useState<number>(0);

    const cities = [
        {
            name: 'PARIS',
            imageUrl: city1,
        },
        {
            name: 'LYON',
            imageUrl: city2
        },
        {
            name: 'BORDEAUX',
            imageUrl: city3
        },
        {
            name: 'RENNES',
            imageUrl: city4
        },
        {
            name: 'MONTPELLIER',
            imageUrl: city5
        },
        {
            name: 'IDF',
            imageUrl: city6
        },
    ];

    return (
        <div className="max-w-6xl mx-auto bg-white px-4 sm:px-6 lg:px-8">
            <div>
                {/* Header Section */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0a1f44] mb-4 md:mb-6">
                        {t('france.title_prefix')} <span className="larken-font font-normal">{t('france.title_suffix')}</span>
                        <br />
                        {t('france.title_end')}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-[#0a1f44]">
                        {t('france.subtitle')}
                    </p>
                </div>

                {/* City Cards Grid */}
                <div className="flex flex-col md:flex-row gap-0 h-[600px] md:h-[500px] lg:h-[600px] ">
                    {cities.map((city, index) => (
                        <CityCard
                            key={city.name}
                            name={city.name}
                            imageUrl={city.imageUrl}
                            isExpanded={expandedCity === index}
                            onHover={() => setExpandedCity(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FranceApartments;