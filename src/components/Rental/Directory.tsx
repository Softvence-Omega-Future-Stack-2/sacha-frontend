import smart from "../../assets/tenant.png";
// --- MARKETING TEXT COMPONENT (Left Panel - Unchanged) ---
const MarketingText = () => (
    <div className="px-4 lg:px-0 ">

        {/* Top Tagline: "Here's why" */}
        <div className="mb-4">
            <span className="inline-block px-4 py-2 text-xs font-medium text-indigo-700 bg-blue-600/10 rounded-full shadow-sm">
                Voici pourquoi
            </span>
        </div>

        {/* Main Heading and Subtitle */}
        <header className="mb-4 md:mb-8 max-w-md">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight "
            // Using a serif-like font for the main title to mimic the image's distinct typography

            >
                Intelligente <span className="text-slate-900 font-normal italic">Annuaire</span>
            </h1>

        </header>

        {/* Body Text */}
        <div className="space-y-6 text-md font-medium text-slate-800">
            <p >
                Arrêtez de perdre du temps à attendre des candidatures.
            </p>
            <p>
                Dès que votre propriété est mise en ligne, My Appart vous donne accès à un annuaire de locataires correspondant à vos critères : type de bien, taille, loyer, localisation, etc.
            </p>
            <p>
                Chaque profil comprend un dossier complet : revenus, situation, garanties, motivation—tout est prêt pour que vous puissiez contacter les meilleurs candidats en un seul clic.
            </p>
            <p className="font-semibold mt-8">
                Gagnez du temps, choisissez en toute confiance.
            </p>
        </div>
    </div>
);

// --- MAIN APP COMPONENT ---
const Directory = () => {
    // Static image URL to simulate the detailed dashboard screenshot with matching colors (blue/white)

    return (
        <div className=" bg-white font-sans antialiased overflow-hidden">
            <div className="container mx-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">

                    {/* Left Side: Marketing Text */}
                    <div className="flex justify-center lg:justify-start">
                        <MarketingText />
                    </div>

                    {/* Right Side: Static Image (Replacing MockDashboard) */}
                    <div className="flex justify-end lg:justify-end">
                        <div className="w-full relative">
                            {/* Image element replacing the complex mock UI, ensuring it maintains the look */}
                            <img
                                src={smart}
                                alt="Dashboard Screenshot Mockup"
                                // Applied the exact same styling as the previous container for pixel-perfect look
                                className="w-full h-full object-cover rounded-3xl  "
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Directory;