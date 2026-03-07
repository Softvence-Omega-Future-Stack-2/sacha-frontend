import { CircleUser, Menu, User, X, ChevronDown, LogOut } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/main-logo.png";

import us from "../../assets/us.png";
import uk from "../../assets/uk.png";
import german from "../../assets/german.png";
import france from "../../assets/franch.png";

const languages = [
  { code: "en-US", name: "English (US)", flag: us },
  { code: "en-GB", name: "English (UK)", flag: uk },
  { code: "de", name: "Deutsch", flag: german },
  { code: "fr", name: "Français", flag: france },
];

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Helper function to check if a link is active
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const langRef = useRef<HTMLDivElement>(null);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Role & Dashboard route
  const userRole =
    typeof window !== "undefined"
      ? localStorage.getItem("role") || "tenant"
      : "tenant";

  const dashboardRoute =
    userRole === "owner" ? "/dashboard-owner" : "/dashboard-tenant";

  // Current language
  useEffect(() => {
    const currentLang = i18n.language || "en";
    const matched =
      languages.find((l) => l.code.startsWith(currentLang.split("-")[0])) ||
      languages[0];
    setSelectedLang(matched);
  }, [i18n.language]);

  // Click outside language dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Login status check
  useEffect(() => {
    const checkLoginStatus = () => {
      const hasToken = !!localStorage.getItem("accessToken");
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(hasToken && loggedIn);
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLogout = () => setShowLogoutConfirm(true);

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    setIsLoggingOut(false);
    window.location.href = "/";
  };

  const changeLanguage = (lang: (typeof languages)[0]) => {
    setSelectedLang(lang);
    const shortCode = lang.code.split("-")[0]; // en-US → en
    i18n.changeLanguage(shortCode);
    setLangOpen(false);
  };

  return (
    <>
      <header className="bg-white border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10" />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* {!(isLoggedIn && userRole === "owner") && ( */}
              <>
                <Link
                  to="/apartments"
                  className={`text-[#061251] hover:text-gray-900 text-base font-medium transition-colors pb-1 border-b-2 ${isActiveLink("/apartments")
                    ? "border-[#256AF4]"
                    : "border-transparent"
                    }`}
                >
                  {t("nav.our_apartments")}
                </Link>
              </>
              {/* )} */}
              {(userRole === "owner") && (
                <Link
                  to="/rental"
                  className={`text-[#061251] hover:text-gray-900 text-base font-medium transition-colors pb-1 border-b-2 ${isActiveLink("/rental")
                    ? "border-[#256AF4]"
                    : "border-transparent"
                    }`}
                >
                  {t("nav.rental_management")}
                </Link>
              )}
              <Link
                to="/premium"
                className={`text-[#061251] hover:text-gray-900 text-base font-medium transition-colors pb-1 border-b-2 ${isActiveLink("/premium")
                  ? "border-[#256AF4]"
                  : "border-transparent"
                  }`}
              >
                {t("nav.premium")}
              </Link>
              <Link
                to="/faq"
                className={`text-[#061251] hover:text-gray-900 text-base font-medium transition-colors pb-1 border-b-2 ${isActiveLink("/faq")
                  ? "border-[#256AF4]"
                  : "border-transparent"
                  }`}
              >
                {t("nav.faq")}
              </Link>
              <Link
                to="/contact"
                className={`text-[#061251] hover:text-gray-900 text-base font-medium transition-colors pb-1 border-b-2 ${isActiveLink("/contact")
                  ? "border-[#256AF4]"
                  : "border-transparent"
                  }`}
              >
                {t("nav.contact")}
              </Link>
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 text-[#061251] hover:text-gray-900 text-base font-medium transition-colors"
                >
                  <img
                    src={selectedLang.flag}
                    alt={selectedLang.name}
                    className="w-5 h-5 rounded-sm"
                  />
                  <span className="hidden sm:inline">
                    {selectedLang.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${langOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>


                {langOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition-colors ${selectedLang.code === lang.code
                          ? "bg-blue-50 text-[#061251]"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <img
                          src={lang.flag}
                          alt={lang.name}
                          className="w-6 h-6 rounded-sm"
                        />
                        <span>{lang.name}</span>
                        {selectedLang.code === lang.code && (
                          <svg
                            className="w-4 h-4 ml-auto text-[#256AF4]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Login / Dashboard */}
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={dashboardRoute}
                    className="px-5 py-2.5 bg-[#256AF4] text-white rounded-xl text-base font-medium hover:bg-[#256AF2] transition-colors"
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 border border-red-600 text-red-600 rounded-xl text-base font-medium hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t("nav.logout")}</span>
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#061251] rounded-xl text-[#061251] hover:bg-gray-50 text-base font-medium transition-colors"
                  >
                    <CircleUser className="w-5 h-5" />
                    <span>{t("nav.login_register")}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${loginDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {loginDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      <Link
                        to="/login"
                        className="block px-4 py-2.5 text-[#061251] hover:bg-gray-50 text-sm font-medium transition-colors"
                        onClick={() => setLoginDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/create-account"
                        className="block px-4 py-2.5 text-[#061251] hover:bg-gray-50 text-sm font-medium transition-colors"
                        onClick={() => setLoginDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {!(isLoggedIn && userRole === "owner") && (
                  <>
                    <Link
                      to="/apartments"
                      className={`text-[#061251] hover:text-gray-900 text-[15px] font-medium py-2 transition-colors border-l-4 pl-2 ${isActiveLink("/apartments")
                        ? "border-[#256AF4] bg-blue-50"
                        : "border-transparent"
                        }`}
                    >
                      {t("nav.our_apartments")}
                    </Link>
                  </>
                )}
                {!(isLoggedIn && userRole === "tenant") && (
                  <Link
                    to="/rental"
                    className={`text-[#061251] hover:text-gray-900 text-[15px] font-medium py-2 transition-colors border-l-4 pl-2 ${isActiveLink("/rental")
                      ? "border-[#256AF4] bg-blue-50"
                      : "border-transparent"
                      }`}
                  >
                    {t("nav.rental_management")}
                  </Link>
                )}
                <Link
                  to="/premium"
                  className={`text-[#061251] hover:text-gray-900 text-[15px] font-medium py-2 transition-colors border-l-4 pl-2 ${isActiveLink("/premium")
                    ? "border-[#256AF4] bg-blue-50"
                    : "border-transparent"
                    }`}
                >
                  {t("nav.premium")}
                </Link>
                <Link
                  to="/faq"
                  className={`text-[#061251] hover:text-gray-900 text-[15px] font-medium py-2 transition-colors border-l-4 pl-2 ${isActiveLink("/faq")
                    ? "border-[#256AF4] bg-blue-50"
                    : "border-transparent"
                    }`}
                >
                  {t("nav.faq")}
                </Link>
                <Link
                  to="/contact"
                  className={`text-[#061251] hover:text-gray-900 text-[15px] font-medium py-2 transition-colors border-l-4 pl-2 ${isActiveLink("/contact")
                    ? "border-[#256AF4] bg-blue-50"
                    : "border-transparent"
                    }`}
                >
                  {t("nav.contact")}
                </Link>

                {/* Mobile Language & Login */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="relative" ref={langRef}>
                    <button
                      onClick={() => setLangOpen(!langOpen)}
                      className="flex items-center gap-2 text-[#061251] hover:text-gray-900 text-[15px] font-medium py-2 transition-colors w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedLang.flag}
                          alt=""
                          className="w-5 h-5 rounded-sm"
                        />
                        <span>{selectedLang.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${langOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {langOpen && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors ${selectedLang.code === lang.code
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                              }`}
                          >
                            <img
                              src={lang.flag}
                              alt=""
                              className="w-6 h-6 rounded-sm"
                            />
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {isLoggedIn ? (
                    <>
                      <Link
                        to={dashboardRoute}
                        className="block w-full text-center px-5 py-2.5 bg-[#061251] text-white rounded-xl text-[15px] font-medium"
                      >
                        {t("nav.dashboard")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full px-5 py-2.5 border border-red-600 text-red-600 rounded-xl text-[15px] font-medium hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t("nav.logout")}</span>
                      </button>
                    </>
                  ) : (
                    <button className="flex items-center justify-center gap-2 w-full px-5 py-2.5 border border-[#061251] rounded-xl text-[#061251] hover:bg-gray-50 text-[15px] font-medium transition-colors">
                      <User className="w-4 h-4" />
                      <span>{t("nav.login_register")}</span>
                    </button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t("Are you sure you want to logout?")}
            </h3>
            <div className="flex gap-3 mt-5">
              <button
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${isLoggingOut
                  ? "bg-red-400 cursor-not-allowed text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
                  }`}
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t("Logging Out...")}
                  </>
                ) : (
                  t("Yes, Logout")
                )}
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
