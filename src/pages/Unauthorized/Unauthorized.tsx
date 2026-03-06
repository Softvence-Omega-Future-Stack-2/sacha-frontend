import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <svg
                    className="w-12 h-12 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#061251] mb-4">
                Access Denied
            </h1>

            <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-md">
                You do not have permission to view this page. If you believe this is a mistake, please contact support or log in with an authorized account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 rounded-xl border-2 border-[#1077FF] text-[#1077FF] font-medium hover:bg-blue-50 transition-colors"
                >
                    Go Back
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-8 py-3 rounded-xl bg-[#1077FF] text-white font-medium hover:bg-[#0d62d6] transition-colors"
                >
                    Return Home
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
