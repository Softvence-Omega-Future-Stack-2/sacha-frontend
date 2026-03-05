import logo from '../../assets/main-logo.png';
import cloud from '../../assets/Premium/clude.png';
import money from '../../assets/Premium/money.png';
import building from '../../assets/Premium/building.png';
import base from '../../assets/Premium/base.png';

const PremiumMember = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Top Logo and Title */}
        <div className="flex items-center mb-8">
          <img src={logo} alt="HelloAppart Logo" className="h-12 w-auto mr-4" />
        </div>

        {/* Main Heading and Subtitle */}
        <div className="mb-16">
          <h1 className="text-3xl lg:text-5xl font-medium text-[#061251] leading-tight mb-4">
            Why become a <span className="larken-font font-normal text-[#061251]">Premium Member?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl">
            The first platform that is revolutionizing apartment searching
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1: No more stress! */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={cloud} alt="No more stress" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">No more stress!</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              With our premium service, find your perfect home <span className="font-semibold text-[#061251]">quickly and easily</span>. In Paris, where searches take an average of <span className="font-semibold text-[#061251]">60 days</span>, choose peace of mind — instantly.
            </p>
          </div>

          {/* Card 2: No hidden fees */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={money} alt="No hidden fees" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">No hidden fees</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              Only upgrade to premium to apply — that’s it. <span className="font-semibold text-[#061251]">No agency fees</span>, no surprises, no hidden costs. Ever.
            </p>
          </div>

          {/* Card 3: Wide selection of apartments */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={building} alt="Wide selection" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">Wide selection of apartments</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              New apartments added <span className="font-semibold text-[#061251]">every single day</span>. Apply to as many as you want — no limits, no restrictions.
            </p>
          </div>

          {/* Card 4: 100% Secure */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={base} alt="100% Secure" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">100% Secure</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              Verified listings, secure file submission, and anti-fraud protection built in. Apply with <span className="font-semibold text-[#061251]">total confidence</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PremiumMember;