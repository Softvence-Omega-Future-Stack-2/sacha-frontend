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
            Pourquoi devenir un <span className="larken-font font-normal text-[#061251]">Premium Member?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl">
            La première plateforme qui révolutionne la recherche d'appartements
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1: No more stress! */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={cloud} alt="No more stress" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">Fini le stress !</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              Avec notre service premium, trouvez votre logement idéal <span className="font-semibold text-[#061251]">rapidement et facilement</span>. À Paris, où les recherches prennent en moyenne <span className="font-semibold text-[#061251]">60 jours</span>, optez pour la tranquillité d'esprit — instantanément.
            </p>
          </div>

          {/* Card 2: No hidden fees */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={money} alt="No hidden fees" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">Aucun frais caché</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              Passez simplement en premium pour postuler — c'est tout. <span className="font-semibold text-[#061251]">Aucuns frais d'agence</span>, aucune surprise, aucun coût caché. Jamais.
            </p>
          </div>

          {/* Card 3: Wide selection of apartments */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={building} alt="Wide selection" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">Large selection of apartments</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              Nouveaux appartements ajoutés <span className="font-semibold text-[#061251]">chaque jour</span>. Postulez à autant que vous le souhaitez — sans limites, sans restrictions.
            </p>
          </div>

          {/* Card 4: 100% Secure */}
          <div className="bg-white p-6 rounded-2xl border border-[rgba(6,18,81,0.20)] text-center flex flex-col items-center justify-start h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <img src={base} alt="100% Secure" className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-5">100% Sécurisé</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-left">
              Annonces vérifiées, soumission sécurisée des dossiers et protection anti-fraude intégrée. Postulez en toute <span className="font-semibold text-[#061251]">confiance</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PremiumMember;