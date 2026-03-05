import arrowLeft from '../../assets/productDetails/arrow-left.svg'
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  ad: any;
}

const Header: React.FC<HeaderProps> = ({ ad }) => {
  const navigate = useNavigate();
  const handelBack = () => {
    navigate(-1)
  };
  return (
    // Outer container with the light blue-gray background color and overall padding
    <div className=" bg-gradient-to-b from-[rgba(37,99,235,0.20)] to-[rgba(37,99,235,0.20)] p-8">
      {/* Card-like container for the content, simulating the main light blue background */}
      <div className=" p-6 sm:p-10 container mx-auto ">

        {/* Top section: Back button */}
        <div className="mb-8">
          <button
            className="flex items-center text-blue-800 hover:text-blue-600 transition duration-150"
            onClick={handelBack}
          >
            <img src={arrowLeft} alt="Back" className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium text-[#061251] ">Back</span>
          </button>
        </div>

        {/* Main Content Area: Title, Address, and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline">

          {/* Left Side: Title and Address */}
          <div className="mb-4 md:mb-0">

            <h1 className="text-2xl sm:text-4xl font-sans font-semibold text-[#061251] leading-tight tracking-tight">
              {ad.title}
            </h1>

            {/* Address */}
            <p className="text-lg text-[#061251] mt-2">
              {ad.display_address || ad.address}
            </p>
          </div>

          {/* Right Side: Price */}
          <div className="flex-shrink-0">
            <span className="text-3xl sm:text-3xl font-normal text-[#061251]">
              €{parseFloat(ad.rent).toLocaleString()}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
