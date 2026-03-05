import React from 'react';
import icon1 from "../../assets/lightning1.png";
import icon2 from "../../assets/lightning2.png";
import icon3 from "../../assets/lightning3.png";
import icon4 from "../../assets/lightning4.png";

const SuccessPillars: React.FC = () => {
    const pillars = [
        {
            icon: icon1,
            title: 'Speed',
            description:
                'All listings are updated. Owners are encouraged to respond quickly. As a result, you save time at every step.'
        },
        {
            icon: icon2,
            title: 'Reliability',
            description:
                'Your data is stored securely. Our priority: to guarantee you a reliable experience, without any unpleasant surprises.'
        },
        {
            icon: icon3,
            title: 'Accompaniement',
            description:
                "Before, during, or after your application, you're never alone. Our team (and our AI assistant) are here to guide you and offer the best options for your situation."
        },
        {
            icon: icon4,
            title: 'Simplicity',
            description:
                'Everything is done online, from application to initial contact. Zero paperwork, zero stress.'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Badge */}
                <div className="mb-6">
                    <span className="inline-block px-5 py-2 bg-[#2563EB1A] text-[#061251] rounded-full text-md">
                        Quick recap
                    </span>
                </div>

                {/* Heading */}
                <h1 className=" sm:text-2xl lg:text-4xl mb-[20px] text-[#061251] font-dm-sans text-3xl font-semibold leading-[120%]">
                    Our 4 pillars for <span className=" font-normal text-[#061251]  larken-font   leading-[120%]">Your Success</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-[#061251] mb-10 max-w-2xl">
                    The first platform that is revolutionizing <br /> apartment searching
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
