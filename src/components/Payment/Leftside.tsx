import React from 'react';
// Assuming this path is correct for your logo
import logo from '../../assets/main-logo.png';

const Leftside: React.FC = () => {
  return (
    // Outer Container with the light green/blue gradient background (as seen in the image)
    <div className="flex  px-4 py-4 w-full justify-center lg:justify-end items-center min-h-screen  bg-[linear-gradient(140deg,rgba(37,99,235,0.2)_0%,rgba(235,232,37,0.2)_100%)]p-4">
      
      {/* The main white card/modal container */}
      <div className=" lg:w-1/2 bg-white lg:mr-16 rounded-3xl  overflow-hidden p-6 sm:p-8">
        
        {/* Logo and Header */}
        <div className="flex items-center space-x-2 mb-8">
          {/* Logo - assuming it's a small PNG/SVG */}
          <img src={logo} alt="HelloAppart Logo" className="h-6 w-auto" />
        
        </div>

        {/* Pricing Summary */}
        <div className="mb-8">
          <p className="text-gray-600 mb-1">Paying for HelloAppart</p>
          <h1 className="text-4xl font-bold text-[#1077FF] mb-6">
            €9.90
          </h1>
          <p className="text-lg text-gray-700">
            Then €12.49/month billed annually.
          </p>
        </div>
        
        {/* --- Feature Blocks --- */}
        <div className="space-y-4 mb-8">
          
          {/* Complete Application Block */}
          <div className="flex items-start p-4 bg-blue-50/70 rounded-xl shadow-inner border border-blue-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-[#1077FF] mt-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12.025c.789-1.355 3.197-6.094 8.542-6.094 5.345 0 7.753 4.739 8.542 6.094-.789 1.355-3.197 6.094-8.542 6.094-5.345 0-7.753-4.739-8.542-6.094z" />
            </svg>
            <p className="ml-3 text-sm text-gray-700">
              Complete your application to find out how many owners are potentially interested.
            </p>
          </div>
          
          {/* Certified Block */}
          <div className="flex items-start p-4 bg-green-50/70 rounded-xl shadow-inner border border-green-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 text-[#1077FF] mt-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944c-.722.016-1.442.046-2.16.09-.94.06-1.874.14-2.793.25-.918.11-1.83.22-2.72.35l-.001.001zM12 21.056c.722-.016 1.442-.046 2.16-.09.94-.06 1.874-.14 2.793-.25.918-.11 1.83-.22 2.72-.35l.001-.001a11.955 11.955 0 01-1.428-1.571 8.995 8.995 0 00-11.455.001 11.955 11.955 0 01-1.428 1.57z" />
            </svg>
            <p className="ml-3 text-sm font-semibold text-gray-700">
              CERTIFIED WITH NO AGENCY FEES
            </p>
          </div>
        </div>
        
        {/* --- Pricing Details Table --- */}
        <div className="space-y-4 mb-8 text-gray-700">
          
          {/* 3-day Premium Trial */}
          <div className="flex justify-between border-b border-[#D3E0FB] pb-2 items-center text-sm">
            <p className="flex items-center">
              3-day Premium Trial <span role="img" aria-label="crown" className="ml-1 text-base">👑</span>
            </p>
            <p className="font-semibold">€9.90</p>
          </div>
          
          {/* Annual Subscription */}
          <div className="flex justify-between items-center text-sm border-b border-[#D3E0FB] pb-2">
            <p className="flex flex-row items-center">
              Then an annual Premium subscription <span role="img" aria-label="crown" className="ml-1 text-base">👑</span>
            </p>
            <p className="text-right">
              <span className="font-semibold text-base">€12.49/month</span>
              <br />
              <span className="text-xs text-gray-500 italic">Billed annually</span>
            </p>
          </div>
          
          {/* Subtotal */}
          <div className="flex justify-between border-b border-[#D3E0FB] pb-2 items-center text-sm">
            <p>Subtotal including tax</p>
            <p className="font-semibold">€9.90</p>
          </div>
          
          {/* Total Due Today */}
          <div className="flex justify-between items-center text-lg font-bold">
            <p>Total due today</p>
            <p className="text-[#1077FF]">€9.90</p>
          </div>
        </div>

        {/* Monthly Offer Link */}
        <div className="text-center">
          <a href="#" className="text-[#1077FF] text-sm hover:underline">
            Our monthly offer
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default Leftside;