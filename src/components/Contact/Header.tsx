const Header = () => {
  return (
    // Main container: blue background across the screen and centering
    <div className=" bg-gradient-to-b mb-8 from-blue-700/20 to-blue-700/20 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 items-start">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl lg:text-5xl larken-font font-normal text-[#061251] leading-tight mb-4">
            Contactez-nous!
          </h1>
          <p className="text-lg text-[#061251] mb-10">
            N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
