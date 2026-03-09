import React from 'react';
import icon1 from "../../assets/lightning1.png";
import icon2 from "../../assets/lightning2.png";
import icon3 from "../../assets/lightning3.png";
import icon4 from "../../assets/lightning4.png";

const SuccessPillars: React.FC = () => {
    const pillars = [
        {
            icon: icon1,
            title: 'Vitesse',
            description:
                'Toutes les annonces sont mises à jour. Les propriétaires sont encouragés à répondre rapidement. En conséquence, vous gagnez du temps à chaque étape.'
        },
        {
            icon: icon2,
            title: 'Fiabilité',
            description:
                'Vos données sont stockées de manière sécurisée. Notre priorité : garantir une expérience fiable, sans surprises désagréables.'
        },
        {
            icon: icon3,
            title: 'Accompagnement',
            description:
                "Avant, pendant, ou après votre demande, vous êtes jamais seul. Notre équipe (et notre assistant AI) sont là pour vous guider et vous offrir les meilleures options pour votre situation."
        },
        {
            icon: icon4,
            title: 'Simplicité',
            description:
                'Tout est fait en ligne, de la demande à la première communication. Aucun dossier, aucun stress.'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Badge */}
                <div className="mb-6">
                    <span className="inline-block px-5 py-2 bg-[#2563EB1A] text-[#061251] rounded-full text-md">
                        Récapitulation rapide
                    </span>
                </div>

                {/* Heading */}
                <h1 className=" sm:text-2xl lg:text-4xl mb-[20px] text-[#061251] font-dm-sans text-3xl font-semibold leading-[120%]">
                    Nos 4 piliers pour <span className=" font-normal text-[#061251]  larken-font   leading-[120%]">Votre Succès</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-[#061251] mb-10 max-w-2xl">
                    La première plateforme qui révolutionne <br /> la recherche d'appartements
                </p>

                {/* Cards Grid */}
                <div className='max-w-5xl mx-auto'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Icon Container */}
                                <div className="mb-8 flex justify-center mt-2">
                                    <div
                                        className={`w-30 h-28 bg-[#F5FAFF] rounded-xl flex items-center justify-center`}
                                    >
                                        <img
                                            src={pillar.icon}
                                            alt={pillar.title}
                                            className="w-12 h-12 object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-semibold text-[#061251] mb-4 text-center">
                                    {pillar.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[#061251] text-center leading-relaxed text-sm">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPillars;
