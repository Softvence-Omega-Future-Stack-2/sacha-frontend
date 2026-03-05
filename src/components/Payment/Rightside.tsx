import React, { useState } from "react";

import mastercardIcon from "../../assets/payment/Mastercard.svg";
import payelIcon from "../../assets/payment/PayPal.svg";
import paymentMethodIcon from "../../assets/payment/Payment method icon (1).svg";
import jcbMethd2Icon from "../../assets/payment/JCB.svg";
import visaIcon from "../../assets/payment/Payment method icon.svg";
const CheckoutForm = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("Card");

  // Colors (unchanged)
  const primaryBlue = "#2563EB";
  const lightBlueBg = "#F3F4F6";
  const mainTextColor = "#1F2937";
  const mutedTextColor = "#4B5563";
  const lighterGrayBg = "#F8FAFC";
  const inputBgColor = "#F9FAFB";
  const lightBlueSectionBg = "#EBF4FF";

  // Reusable Input Field
  const InputField: React.FC<{
    label?: string;
    placeholder: string;
    halfWidth?: boolean;
  }> = ({ label, placeholder, halfWidth = false }) => (
    <div className={halfWidth ? "flex-1" : "w-full"}>
      {label && (
        <label
          className={`block text-xs font-medium mb-1`}
          style={{ color: mutedTextColor }}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-1.5 gap-2 text-base placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        style={{
          minHeight: "56px",
          backgroundColor: inputBgColor,
          outline: "none",
        }}
      />
    </div>
  );

  // Billing Address Block
  const BillingAddressBlock: React.FC<{
    showZip?: boolean;
    showStateDropdown?: boolean;
  }> = ({ showZip = true, showStateDropdown = false }) => (
    <div className="rounded-xl mt-6 p-3 overflow-hidden">
      <div
        className="px-4 py-3 text-sm font-medium"
        style={{ backgroundColor: lightBlueSectionBg, color: mainTextColor }}
      >
        Billing address
      </div>

      <div
        className="px-4 py-3 mb-2 text-base font-medium"
        style={{
          backgroundColor: lightBlueSectionBg,
          borderTop: "1px solid #E5E7EB",
          color: mainTextColor,
        }}
      >
        United State
      </div>

      <InputField placeholder="Address Line 1" />
      <InputField placeholder="Address Line 2" />

      <div className="flex w-full">
        <InputField placeholder="City" halfWidth />
        <div className="w-px bg-gray-200" />
        <InputField placeholder={showZip ? "Zip" : "Postal Code"} halfWidth />
      </div>

      {showStateDropdown && (
        <div className="relative w-full">
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-base appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{
              minHeight: "56px",
              backgroundColor: inputBgColor,
              outline: "none",
              borderTop: "1px solid #E5E7EB",
            }}
            defaultValue=""
          >
            <option value="">Paris</option>
            <option value="">Corsica</option>
            <option value="">Normandy</option>
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );

  // Payment Detail Components
  const CardDetailsForm = () => (
    <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-white space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            className="block text-xs font-medium mb-1"
            style={{ color: mutedTextColor }}
          >
            Card Number
          </label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            className="block text-xs font-medium mb-1"
            style={{ color: mutedTextColor }}
          >
            Expiration Date (MM/YY)
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-xs font-medium mb-1"
            style={{ color: mutedTextColor }}
          >
            CVC
          </label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const CashAppPayDetails = () => (
    <div
      className="mt-3 p-4 rounded-xl shadow-lg"
      style={{ backgroundColor: lighterGrayBg }}
    >
      <InputField placeholder="Full name on card" />
      <BillingAddressBlock showZip showStateDropdown />
      <div className="flex items-center mt-6 text-sm text-gray-600">
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 17v2a2 2 0 0 0 2 2h2" />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" />
          <path d="M16 20h2a2 2 0 0 0 2-2v-2" />
          <path d="M4 7V5a2 2 0 0 1 2-2h2" />
          <path d="M10 12h4" />
          <path d="M12 10v4" />
        </svg>
        <span>You will be shown a QR code to scan using Cash App Pay.</span>
      </div>
    </div>
  );

  const BankDetails = () => (
    <div
      className="mt-3 p-4 rounded-xl shadow-lg"
      style={{ backgroundColor: lighterGrayBg }}
    >
      <div className="relative w-full mb-6">
        <select
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{
            minHeight: "56px",
            backgroundColor: inputBgColor,
            outline: "none",
          }}
          defaultValue=""
        >
          <option value="" disabled>
            State
          </option>
        </select>
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <BillingAddressBlock showZip={false} />
    </div>
  );

  const PaymentDetails: React.FC<{ method: string }> = ({ method }) => {
    switch (method) {
      case "Card":
        return <CardDetailsForm />;
      case "Cash App Pay":
        return <CashAppPayDetails />;
      case "Bank":
        return <BankDetails />;
      default:
        return null;
    }
  };

  // Payment Option
  const PaymentOption: React.FC<{
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    methods?: boolean;
  }> = ({ icon: Icon, title, methods }) => {
    const selected = selectedMethod === title;
    const handleClick = () => setSelectedMethod(title);

    return (
      <div className="flex flex-col">
        <label
          onClick={handleClick}
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
            selected
              ? `bg-${lightBlueBg} border-blue-500`
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
          style={{ minHeight: "68px" }}
        >
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 mr-3 flex-shrink-0 ${
              selected ? `border-${primaryBlue}` : "border-gray-400"
            } bg-white`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                selected ? `bg-${primaryBlue}` : ""
              }`}
            ></div>
          </div>

          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <Icon
                className={`w-5 h-5 mr-2`}
                style={{ color: mainTextColor }}
              />
              <span
                className="text-base font-medium"
                style={{ color: mainTextColor }}
              >
                {title}
              </span>
            </div>
            {methods && (
              <div className="hidden md:flex space-x-1.5 ml-4">
                <div className="flex gap-2 space-x-1">
                  <div className=" rounded-sm">
                    <img src={visaIcon} alt="Visa" className="w-9 h-9" />
                  </div>
                  <div className="rounded-sm">
                    <img src={payelIcon} alt="Visa"  className="w-9 h-9" />
                  </div>
                  <div className=" rounded-sm">
                    <img src={paymentMethodIcon} alt="Visa"  className="w-9 h-9" />
                  </div>
                  <div className="rounded-sm">
                    <img src={mastercardIcon} alt="Visa"   className="w-9 h-9"/>
                  </div>
                  <div className=" rounded-sm">
                    <img src={jcbMethd2Icon} alt="Visa"   className="w-9 h-9"/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </label>

        {selected && <PaymentDetails method={title} />}
      </div>
    );
  };

  // Icons
  const CardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );

  const CashAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  const BankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M6 20v-2" />
      <path d="M10 20v-2" />
      <path d="M14 20v-2" />
      <path d="M18 20v-2" />
      <path d="M2 12h20" />
    </svg>
  );

  return (
    <div className="p-6 overflow-auto-y lg:w-2/3 mx-auto bg-white">
      {/* Contact Information */}
      <h2
        className="text-2xl font-semibold mb-6 "
    
      >
        Contact <span className="italic font-normal" >information</span> 
      </h2>
      <div className="flex space-x-4 mb-10">
        <div className="flex-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: mutedTextColor }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ minHeight: "48px" }}
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: mutedTextColor }}
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ minHeight: "48px" }}
          />
        </div>
      </div>

      {/* Payment Method */}
      <h2
        className="text-2xl font-normal mb-6 italic"
        style={{ color: mainTextColor, fontWeight: 300 }}
      >
        Payment method
      </h2>

      <div className="space-y-3 p-1 rounded-xl bg-white">
        <PaymentOption title="Card" icon={CardIcon} methods={true} />
        <PaymentOption
          title="Cash App Pay"
          icon={CashAppIcon}
          methods={false}
        />
        <PaymentOption title="Bank" icon={BankIcon} methods={false} />
      </div>

      {/* Terms Checkbox */}
      <label className="flex items-start mt-8 mb-6 cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 rounded-md border-gray-300 mr-3 text-blue-600 flex-shrink-0 mt-0.5"
          required
        />
        <p
          className="text-sm leading-relaxed"
          style={{ color: mutedTextColor }}
        >
          I accept the general terms and conditions of sale and I expressly
          acknowledge waiving my right of withdrawal, in accordance with Article
          L. 221–28 of the Consumer Code, as soon as the service has begun or
          the digital content has been provided immediately after my order.
        </p>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-400/50 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        style={{
          backgroundColor: primaryBlue,
          minHeight: "60px",
          borderRadius: "12px",
        }}
      >
        PAY AND START THE TRIAL PERIOD
      </button>

      <p className="text-xs text-center mt-4 text-gray-500">
        If you do not cancel your trial, you will be charged €12.49/month
        (€149.90/year) annually starting from 08/11/2025
      </p>
    </div>
  );
};

export default CheckoutForm;
