import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircleUser } from 'lucide-react';
import icon1 from '../../assets/apart1.png';
import logo from '../../assets/main-logo.png';
import icon2 from '../../assets/apart2.png';
import icon3 from '../../assets/apart3.png';

const WorksSection: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Login status check (same logic as Navbar)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Modal state
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleCtaClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);

        } else {

        }
    };

    return (
        <>
            <div className='bg-[#EEF5FD] w-full'>
                <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">

                        {/* Badge */}
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#2563EB1A] rounded-full">
                                <span className="text-base">{t('works.badge')}</span>
                                <span className="text-sm text-[#061251]">
                                    {t('works.badge_text')}
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="sm:text-2xl lg:text-4xl text-[#061251] font-dm-sans text-3xl font-semibold leading-[120%] mb-4">
                            {t('works.title_prefix')} <span className="font-normal text-[#061251]  larken-font   leading-[120%]">{t('works.title_suffix')}</span>?
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg text-[#061251] mb-16 max-w-xl">
                            {t('works.subtitle')} <br />{t('works.subtitle_2')}
                        </p>

                        {/* Steps Grid */}
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

                            {/* Card 1 */}
                            <div className="rounded-3xl p-8 border border-[#06125133]">
                                <div className="mb-6">
                                    <div className="w-full bg-white rounded-2xl pt-8 pb-10 flex flex-col justify-between h-full px-6">
                                        <div className="w-30 h-5">
                                            <img src={logo} alt="logo" className="w-full" />
                                        </div>
                                        <div className="w-full mt-8 h-36 flex items-center justify-center">
                                            <img src={icon1} alt="image" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-[#1a1a4d] mb-4 text-center">
                                    {t('works.card_1_title')}
                                </h3>
                                <p className="text-[#061251] leading-relaxed text-sm text-center">
                                    {t('works.card_1_desc')}
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="rounded-3xl p-8 border border-[#06125133]">
                                <div className="mb-6">
                                    <div className="w-full bg-white rounded-2xl pt-8 pb-10 flex flex-col justify-between h-full px-6">
                                        <div className="w-30 h-5">
                                            <img src={logo} alt="logo" className="w-full" />
                                        </div>
                                        <div className="w-full mt-8 h-36 flex items-center justify-center">
                                            <img src={icon2} alt="image" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-[#1a1a4d] mb-4 text-center">
                                    {t('works.card_2_title')}
                                </h3>
                                <p className="text-[#061251] leading-relaxed text-sm text-center">
                                    {t('works.card_2_desc')}
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="rounded-3xl p-8 border border-[#06125133]">
                                <div className="mb-6">
                                    <div className="w-full bg-white rounded-2xl pt-8 pb-10 flex flex-col justify-between h-full px-6">
                                        <div className="w-30 h-5">
                                            <img src={logo} alt="logo" className="w-full" />
                                        </div>
                                        <div className="w-full mt-8 h-36 flex items-center justify-start">
                                            <img src={icon3} alt="image" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-[#1a1a4d] mb-4 text-center">
                                    {t('works.card_3_title')}
                                </h3>
                                <p className="text-[#061251] leading-relaxed text-sm text-center">
                                    {t('works.card_3_desc')}
                                </p>
                            </div>

                        </div>

                        {/* CTA - Only show if NOT logged in OR customize behavior */}
                        {!isLoggedIn && (
                            <div className="flex flex-col items-center gap-3">
                                <button
                                    onClick={handleCtaClick}
                                    className="bg-[#1077FF] cursor-pointer hover:bg-[#0b5ed7] text-white text-sm px-16 py-4 rounded-2xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {t('works.cta_button')}
                                </button>
                                <p className="text-sm text-[#061251]">
                                    {t('works.cta_subtext')}
                                </p>
                            </div>
                        )}


                    </div>
                </div>
            </div>

            {/* Login Required Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center animate-pulse">
                        <div className="mb-6">
                            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                <CircleUser className="w-12 h-12 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('works.login_modal_title')}</h3>
                        <p className="text-gray-600 mb-8">{t('works.login_modal_desc')}</p>
                        <div className="flex gap-4">
                            <button onClick={() => navigate("/login")} className="flex-1 bg-[#061251] text-white py-3 rounded-xl font-medium hover:bg-[#050f3a] transition-colors">
                                {t('works.login_modal_btn')}
                            </button>
                            <button onClick={() => setShowLoginModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors">
                                {t('works.login_modal_cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WorksSection;