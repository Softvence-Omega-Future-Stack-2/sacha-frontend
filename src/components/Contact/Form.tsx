import { useState } from "react";

const ContactForm = () => {
  const [open, setOpen] = useState(false);

  // Country List From Google Flag CDN
  const countries = [
    { name: "Bangladesh", code: "+880", flag: "https://flagcdn.com/w20/bd.png" },
    { name: "France", code: "+33", flag: "https://flagcdn.com/w20/fr.png" },
    { name: "Australia", code: "+61", flag: "https://flagcdn.com/w20/au.png" },
    { name: "Germany", code: "+49", flag: "https://flagcdn.com/w20/de.png" },
    { name: "United States", code: "+1", flag: "https://flagcdn.com/w20/us.png" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const labelColor = "text-black";
  const inputBorder = "border-[#E8E8E8]";

  return (
    <div className="flex justify-center px-4 items-center">
      <div className={`w-full max-w-lg rounded-xl`}>
        <form className="space-y-6">
          {/* --- Name Field --- */}
          <div className="flex flex-col">
            <label htmlFor="name" className={`text-base font-medium mb-2 ${labelColor}`}>
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className={`py-3 px-4 border ${inputBorder} rounded-lg text-base text-gray-800 placeholder-gray-500 focus:outline-none transition duration-150`}
            />
          </div>

          {/* --- Email Field --- */}
          <div className="flex flex-col">
            <label htmlFor="email" className={`text-base font-medium mb-2 ${labelColor}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email@example.com"
              className={`py-3 px-4 border ${inputBorder} rounded-lg text-base text-gray-800 placeholder-gray-500 focus:outline-none transition duration-150`}
            />
          </div>

          {/* --- Phone Field (Dropdown Added) --- */}
          <div className="flex flex-col relative">
            <label htmlFor="phone" className={`text-base font-medium mb-2 ${labelColor}`}>
              Phone
            </label>

            <div
              className={`flex w-full border ${inputBorder} rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 transition duration-150`}
            >
              {/* Country Selector */}
              <div
                className="flex items-center py-3 px-3 cursor-pointer bg-white border-r border-custom-gray-300"
                onClick={() => setOpen(!open)}
              >
                <img src={selectedCountry.flag} alt="Flag" className="h-5 w-5 mr-1" />
                <span className="text-gray-700 text-sm">{selectedCountry.code}</span>
                <span className="ml-1 text-gray-500 text-sm">▼</span>
              </div>

              {/* Phone Input */}
              <input
                type="tel"
                id="phone"
                placeholder="1234"
                className="flex-grow py-3 px-4 text-base border-none focus:outline-none placeholder-gray-500"
              />
            </div>

            {/* DROPDOWN LIST */}
            {open && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-30 max-h-56 overflow-y-auto">
                {countries.map((c, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedCountry(c);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <img src={c.flag} alt={c.name} className="h-4 w-4" />
                    <span className="text-sm">{c.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- Message Field --- */}
          <div className="flex flex-col">
            <label htmlFor="message" className={`text-base font-medium mb-2 ${labelColor}`}>
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Enter your Number"
              className={`py-3 px-4 border ${inputBorder} rounded-lg text-base text-gray-800 placeholder-gray-500 focus:outline-none transition duration-150 resize-none`}
            ></textarea>
          </div>

          {/* --- Submit Button --- */}
          <button
            type="submit"
            className={`w-full py-3 mt-4 text-white bg-[#256AF4] shadow-[0_10px_80px_rgba(0,60,162,0.30)] p-6 rounded-lg font-semibold text-lg transition duration-300 ease-in-out`}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
