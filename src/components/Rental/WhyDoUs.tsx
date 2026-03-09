

import checkIcon from '../../assets/rental/flowbite_badge-check-solid.svg';
import userIcon from '../../assets/rental/user.png';
import fileIcon from '../../assets/rental/file.png';
import targetIcon from '../../assets/rental/terget.png';
import globeIcon from '../../assets/rental/world.png';

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
const CheckListItem = ({ text }: { text: string }) => (
  <li className="flex items-start mt-2">
    <img src={checkIcon} alt="Check Icon" className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
    <span className="text-sm text-gray-700">{text}</span>
  </li>
);

// --- Feature Card Component ---
const FeatureCard = ({ icon, title, description, listItems, color }: { icon: React.ReactNode; title: string; description: string; listItems: string[]; color: string }) => (
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

    <ul className="list-none p-0">
      {listItems.map((item, index) => (
        <CheckListItem key={index} text={item} />
      ))}
    </ul>
  </div>
);

// --- MAIN APP COMPONENT ---
const WhyDoUs = () => {
  // Data for the four feature columns
  const features = [
    {
      title: "Annuaire intelligent de candidats",
      description: "Accédez à une base de données de candidats présélectionnés qui correspondent à vos critères",
      icon: <img src={userIcon} alt="Target Icon" className="h-6 w-6" />,
      color: "blue",
      listItems: [
        "Dossiers vérifiés",
        "Score de compatibilité",
        "Filtrage avancé",
      ],
    },
    {
      title: "Dossiers complets disponibles pour consultation",
      description: "Consultez tous les justificatifs des locataires potentiels en un clic",
      icon: <img src={fileIcon} alt="Target Icon" className="h-6 w-6" />,
      color: "light-blue",
      listItems: [
        "Identifier les documents",
        "Fiches de paie",
        "Garanties vérifiées",
      ],
    },
    {
      title: "Matching précis et rapide",
      description: "Notre IA sélectionne automatiquement les meilleurs candidats pour votre propriété",
      icon: <img src={targetIcon} alt="Target Icon" className="h-6 w-6" />, // Using Zap for speed/accuracy, mimicking the graphic target icon
      color: "purple-blue",
      listItems: [
        "Algorithme IA",
        "Critères personnalisés",
        "Gain de temps",
      ],
    },
    {
      title: "Diffusion multi-sites gratuite",
      description: "Nous publions gratuitement votre annonce sur tous nos sites partenaires payants pour maximiser votre visibilité sans frais supplémentaires.",
      icon: <img src={globeIcon} alt="Globe Icon" className="h-6 w-6" />,
      color: "green-blue",
      listItems: [
        "Les sites partenaires exigent normalement un paiement",
        "Économies allant jusqu'à 200 €/mois",
        "100% gratuit pour vous",
      ],
    },
  ];

  return (
    <div className=" bg-white font-sans antialiased">
      <div className="container mx-auto px-4 lg:px-0 py-16 md:py-24">

        {/* Top Tagline: "Here's why" */}
        <div className="mb-4">
          <span className="inline-block px-4  py-2 text-xs font-medium text-indigo-700 bg-blue-600/10 rounded-full shadow-sm">
            Voici pourquoi
          </span>
        </div>

        {/* Main Heading and Subtitle */}
        <header className="mb-4 md:mb-8 max-w-md">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight "
          // Using a serif-like font for the main title to mimic the image's distinct typography

          >
            Pourquoi <span className="text-slate-900 font-normal italic">les propriétaires nous adorent-ils ?</span>
          </h1>
          <p className="mt-4 text-md md:text-xl text-gray-700 font-normal">
            Des outils conçus pour les propriétaires modernes qui souhaitent gagner du temps et sécuriser leurs locations.
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
              listItems={feature.listItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyDoUs;