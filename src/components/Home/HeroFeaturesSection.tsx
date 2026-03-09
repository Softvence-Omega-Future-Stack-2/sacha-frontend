import React from 'react';
import logo from '../../assets/main-logo.png';

import certified from '../../assets/certified.png';
import credit from '../../assets/credit.png';
import data from '../../assets/data.png';
import guarantee from '../../assets/guarantee.png';
import search from '../../assets/search.png';
import tracking from '../../assets/tracking.png';
import verified from '../../assets/verified.png';

const HeroFeaturesSection: React.FC = () => {
    const topFeatures = [
        {
            icon: credit,
            title: '€0 frais d\'agence',
            description: 'Enregistrer jusqu\'à €2000 sur votre location'
        },
        {
            icon: search,
            title: 'Recherche double',
            description: 'Vous postulez ET recevez des offres directes'
        },
        {
            icon: guarantee,
            title: 'Réponse garantie dans 48 heures',
            description: 'Vous postulez ET recevez des offres directes'
        },
        {
            icon: verified,
            title: '100% annonces vérifiées',
            description: 'Chaque annonce est vérifiée manuellement'
        }
    ];

    const bottomFeatures = [
        {
            icon: certified,
            title: 'Propriétaires certifiés',
            description: 'Chaque annonce est vérifiée manuellement'
        },
        {
            icon: tracking,
            title: 'Suivi en temps réel',
            description: 'Chaque annonce est vérifiée manuellement'
        },
        {
            icon: data,
            title: 'Protection des données',
            description: 'Chaque annonce est vérifiée manuellement'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Logo */}
                <div className="mb-6">
                    <img src={logo} alt="logo" />
                </div>

                {/* Hero Heading */}
                <h1 className=" sm:text-2xl lg:text-4xl text-[#061251] font-dm-sans text-3xl font-semibold leading-[120%] mb-4">
                    Plus simple, Plus rapide, <span className="font-normal text-[#061251]  larken-font   leading-[120%]">Plus sûr</span>
                </h1>

                {/* Subheading */}
                <p className="text-[#061251] mb-8 max-w-xl text-base">
                    La première plateforme qui révolutionne <br /> la recherche d'appartements
                </p>

                {/* Top Row - 4 Equal Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-5xl mx-auto">
                    {topFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 border border-gray-200 hover:shadow-lg 
                                       transition-shadow duration-300 flex flex-col items-center 
                                       h-[300px]"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-30 h-32 bg-[#F5FAFF] rounded-xl flex items-center justify-center">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-[#061251] text-center mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-[#061251] text-center text-xs grow">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Row - 3 Equal Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    {bottomFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 border border-gray-200 hover:shadow-lg 
                                       transition-shadow duration-300 flex flex-col items-center 
                                       h-[300px]"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-30 h-32 bg-[#F5FAFF] rounded-xl flex items-center justify-center">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-[#061251] text-center mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-[#061251] text-center text-xs grow">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroFeaturesSection;
