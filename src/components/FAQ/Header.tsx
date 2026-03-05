const Header = () => {
  return (
    // Main container: blue background across the screen and centering
    <div className=" bg-gradient-to-b mb-8 from-blue-700/20 to-blue-700/20 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 items-start">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl lg:text-5xl font-semibold text-[#061251] leading-tight mb-4">
            Frequently <br />
            <span className="larken-font font-normal ">Asked question</span>{" "}
            {/* Italic, serif font */}
          </h1>
          <p className="text-lg text-[#061251] ">
            Upgrade to Premium and apply to unlimited jobs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
