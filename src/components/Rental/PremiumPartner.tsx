
import FeatureCard from './FeatureCard';

import globalIcon from "../../assets/rental/world.png";
import baseIcon from "../../assets/rental/base.png";
import dimondIcon from "../../assets/rental/dimond.png";

const GlobeIcon = <div className="text-5xl text-blue-500 bg-transparent"><img src={globalIcon} alt="Globe Icon" className="h-10 w-10" /></div>; // Replace with a styled SVG
const ShieldIcon = <div className="text-5xl text-green-500 bg-transparent"> <img src={baseIcon} alt="Shield Icon" className="h-10 w-10" /></div>; // Replace with a styled SVG
const DiamondIcon = <div className="text-5xl text-cyan-500 bg-transparent"> <img src={dimondIcon} alt="Diamond Icon" className="h-10 w-10" /></div>; //</div>; // Replace with a styled SVG

const PremiumPartner = () => {
  const features = [
    {
      title: "Sites partenaires premium",
      description: "Publication automatique et GRATUITE sur plus de 20 sites spécialisés qui sont normalement payants (économies allant jusqu'à 200 €/mois)",
      icon: GlobeIcon, // Use an actual globe icon component
    },
    {
      title: "Assureurs partenaires",
      description: "Protection juridique incluse dans l'abonnement locataire pour sécuriser votre relation bailleur-locataire",
      icon: ShieldIcon, // Use an actual shield icon component
    },
    {
      title: "Services premium",
      description: "Accès à un réseau de professionnels certifiés : diagnosticiens, experts, avocats spécialisés",
      icon: DiamondIcon, // Use an actual diamond icon component
    },
  ];

  return (
    <div className="  py-16 px-4 sm:px-6 lg:px-8">

      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-center text-[#1a1a4d] mb-2">
          Premium <span className="larken-font font-light">Sites partenaires</span>
        </h1>

        <p className="text-lg text-gray-700 font-semibold">
          Nous publions vos annonces GRATUITEMENT sur des sites partenaires qui facturent normalement des frais.
        </p>
        <p className="text-lg text-gray-700  font-semibold">
          Économisez jusqu'à 200 €/mois en frais de publication !
        </p>
      </header>

      {/* Cards Section - Responsive Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPartner;