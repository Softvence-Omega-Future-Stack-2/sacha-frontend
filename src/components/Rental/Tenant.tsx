
// --- Step Card Component (The core visual element) ---
const StepCard = ({ number, title, description }: { number: number; title: string; description: string }) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-100/70 transition duration-300 hover:shadow-xl flex flex-col items-center text-center h-full">
      {/* Large Blue Number */}
      <div className="text-6xl font-semibold text-blue-700 mb-8" style={{ lineHeight: 1 }}>
        {number}
      </div>

      {/* Step Title */}
      <h3 className="text-xl font-semibold mb-3 text-[#061251]">
        {title}
      </h3>

      {/* Step Description */}
      <p className="text-base text-gray-600 font-light">
        {description}
      </p>
    </div>
  );
};

// --- MAIN APP COMPONENT (Replacing the previous landlord love section) ---
const App = () => {
  const steps = [
    {
      number: 1,
      title: "Publiez votre annonce",
      description: "Décrivez votre propriété avec des photos et les critères de location",
    },
    {
      number: 2,
      title: "Recevez les candidatures",
      description: "Notre système vous suggère automatiquement les meilleurs profils.",
    },
    {
      number: 3,
      title: "Sélectionnez votre locataire",
      description: "Examinez les dossiers complets et contactez les candidats que vous préférez",
    },
  ];

  return (
    <div className="bg-blue-50 font-sans antialiased flex justify-center items-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">

        {/* Top Tagline: "How it works" */}
        <div className="mb-4">
          <span className="inline-block px-4 py-1 text-sm font-medium text-blue-800 bg-blue-200/50 rounded-full shadow-sm">
            Comment ça marche
          </span>
        </div>

        {/* Main Heading and Subtitle */}
        <header className="mb-16 md:mb-20 max-w-md">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight "
          // Using a serif-like font for the main title to mimic the image's distinct typography

          >
            Trouvez votre locataire en 3  <span className="text-slate-900 font-normal italic">étapes simples</span>
          </h1>
          <p className="mt-4 text-md md:text-xl text-gray-700 font-normal">
            En 3 étapes simples, trouvez votre appartement plus rapidement qu'avec une agence traditionnelle
          </p>
        </header>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;