import React from 'react';
import logo from '../../assets/main-logo.png'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-22">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* Logo Section */}
          <div className="flex sm:block justify-center sm:justify-start">
            <img src={logo} alt="logo" className="w-40 sm:w-44 md:w-48" />
          </div>

          {/* Navigation Section */}
          <div className='ml-4 lg:ml-0' >
            <h3 className="text-gray-900 font-semibold text-xl mb-4">Navigation</h3>
            <ul className="space-y-3 pl-5">
              <li className="list-disc pl-3 marker:text-gray-600 hover:marker:text-blue-500">
                <Link
                  to="/apartments"
                  className="text-[#061251] hover:text-blue-500 transition-colors text-md"
                >
                  Nos appartements
                </Link>
              </li>

              <li className="list-disc pl-3 marker:text-gray-600 hover:marker:text-blue-500">
                <Link
                  to="/subscription"
                  className="text-[#061251] hover:text-blue-500 transition-colors text-md"
                >
                  Abonnement
                </Link>
              </li>

              <li className="list-disc pl-3 marker:text-gray-600 hover:marker:text-blue-500">
                <Link
                  to="/premium"
                  className="text-[#061251] hover:text-blue-500 transition-colors text-md"
                >
                  Service Premium
                </Link>
              </li>

              <li className="list-disc pl-3 marker:text-gray-600 hover:marker:text-blue-500">
                <Link
                  to="/faq"
                  className="text-[#061251] hover:text-blue-500 transition-colors text-md"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-4">Services</h3>
            <ul className="space-y-3 pl-5">
              <li className='list-disc pl-3 marker:text-gray-600 hover:marker:text-blue-500'>
                <a href="#" className="text-[#061251] hover:text-blue-500 transition-colors text-md">
                  Se connecter
                </a>
              </li>

              <li className='list-disc pl-3 marker:text-gray-600 hover:marker:text-blue-500'>
                <a href="#" className="text-[#061251] hover:text-blue-500 transition-colors text-md">
                  S'inscrire
                </a>
              </li>

              <li className='list-disc pl-3 marker:text-gray-600 hover:marker:text-blue-500'>
                <a href="#" className="text-[#061251] hover:text-blue-500 transition-colors text-md">
                  24/7 Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="text-md flex flex-col sm:flex-row gap-2 sm:gap-3">
                <span className="text-[#061251]">Adresse</span>
                <p className="text-[#061251] leading-snug">
                  1803 Research Blvd, unité 102, Rockville, MD 20850
                </p>
              </li>

              <li className="text-md flex flex-col sm:flex-row gap-2 sm:gap-7">
                <span className="text-[#061251]">Email</span>
                <p className="text-[#061251]">
                  <a
                    href="mailto:Info@Homebridgedc.Com"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Info@Homebridgedc.Com
                  </a>
                </p>
              </li>

              <li className="text-md flex flex-col sm:flex-row gap-2 sm:gap-6">
                <span className="text-[#061251]">Téléphone</span>
                <p className="text-[#061251]">
                  <a href="tel:240-907-1065" className="hover:text-blue-500 transition-colors">
                    240-907-1065
                  </a>
                </p>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 py-6 border-t border-gray-200">
        <p className="text-center text-[#061251] text-sm">
          © 2025. HomeAppart - Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;
