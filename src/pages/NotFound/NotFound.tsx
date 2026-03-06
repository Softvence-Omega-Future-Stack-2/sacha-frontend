import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white text-center">
            <h1 className="text-[120px] sm:text-[150px] font-bold text-[#f0f2f5] leading-none select-none relative">
                404
                <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#061251]">
                    Page Not Found
                </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-500 mt-4 mb-8 max-w-md">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <button
                onClick={() => navigate("/")}
                className="px-8 py-3 rounded-xl bg-[#1077FF] text-white font-medium hover:bg-[#0d62d6] transition-colors flex items-center gap-2"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
                Return Home
            </button>
        </div>
    );
};

export default NotFound;
