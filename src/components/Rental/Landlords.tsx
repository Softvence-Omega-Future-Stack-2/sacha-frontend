import phone from '../../assets/rental/phone-call-01.svg';
import doller from '../../assets/rental/currency-dollar-circle.svg';
import fileIcon from '../../assets/rental/file.png';
import search from '../../assets/rental/search-lg.svg';

// --- Reusable Icon Component (Simulating the gradient backgrounds) ---
const FeatureIcon = ({ children, color }: { children: React.ReactNode; color: string }) => {
  // Custom styling to mimic the soft gradient/shadow circle background from the image
  let backgroundClasses = '';
  switch (color) {
    case 'blue': // Intelligent candidate directory
      backgroundClasses = 'bg-blue-100/70 border border-blue-200 ';
      break;
    case 'light-blue': // Complete files available
      backgroundClasses = 'bg-sky-100/70 border border-sky-200 ';
      break;
    case 'purple-blue': // Accurate and fast matching
      backgroundClasses = 'bg-indigo-100/70 border border-indigo-200 ';
      break;
    case 'green-blue': // Free multi-site distribution
      backgroundClasses = 'bg-emerald-100/70 border border-emerald-200 ';
      break;
    default:
      backgroundClasses = 'bg-gray-100';
  }

  return (
    <div className={`p-4 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${backgroundClasses}`}>
      {children}
    </div>
  );
};

// --- Reusable Checkmark List Item ---


// --- Feature Card Component ---
const FeatureCard = ({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string; listItems?: string[] }) => (
  <div className="flex flex-col">
    <FeatureIcon color={color}>
      {icon}
    </FeatureIcon>
    
    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-slate-900 tracking-tight leading-snug">
      {title}
    </h3>
    
    <p className="text-base text-gray-600 mb-4">
      {description}
    </p>


  </div>
);


export const Landlords = () => {
  // Data for the four feature columns
  const features = [
    {
      title: "No more harassment",
      description: "Access a database of pre-qualified candidates who match your criteria",
      icon: <img src={phone} alt="Target Icon" className="h-6 w-6" />,
      color: "blue",
  
    },
    {
      title: "No more unpaid rent",
      description: "View all supporting documents from potential tenants in one click",
      icon: <img src={doller} alt="Target Icon" className="h-6 w-6" />,
      color: "light-blue",
  
    },
    {
      title: "Tenant selection",
      description: "Our AI automatically selects the best candidates for your property",
      icon: <img src={search} alt="Target Icon" className="h-6 w-6" />, // Using Zap for speed/accuracy, mimicking the graphic target icon
      color: "purple-blue",
  
    },
    {
      title: "Lease templates",
      description: "We publish your ad for FREE on all our paid partner sites to maximize your visibility at no extra cost.",
      icon:  <img src={fileIcon} alt="Globe Icon" className="h-6 w-6" />,
      color: "green-blue",
   
    },
  ];

  return (
    <div className=" bg-white font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-16 md:py-24">
        
        {/* Top Tagline: "Here's why" */}
        <div className="mb-4">
          <span className="inline-block px-4 py-2 text-xs font-medium text-indigo-700 bg-blue-600/10 rounded-full shadow-sm">
            Here's why
          </span>
        </div>

        {/* Main Heading and Subtitle */}
        <header className="mb-4 md:mb-8 max-w-md">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight "
             // Using a serif-like font for the main title to mimic the image's distinct typography
            
          >
            Why do <span className="text-slate-900 font-normal italic">Landlords Love Us?</span>
          </h1>
          <p className="mt-4 text-md md:text-xl text-gray-700 font-normal">
            Tools designed for modern landlords who want to save time and secure their rentals
          </p>
        </header>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            
            />
          ))}
        </div>
      </div>
    </div>
  );
}
