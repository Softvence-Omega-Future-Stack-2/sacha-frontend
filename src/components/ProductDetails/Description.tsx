interface DescriptionProps {
  ad: any;
}

const Description: React.FC<DescriptionProps> = ({ ad }) => {
  return (
    <div className="container mt-8 mx-auto flex justify-start  px-4 lg:px-0 ">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Description
        </h2>
        <div className="text-[#646492] mb-8 whitespace-pre-wrap leading-relaxed">
          {ad.description}
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <p className="text-[#061251] font-semibold mb-4">Comment postuler à un logement ?</p>
          <ol className="text-[#646492] space-y-4 mb-8 list-decimal pl-5">
            <li>Créez votre compte sur MY APPART.</li>
            <li>Soumettez votre dossier de candidature complet pour le locataire.</li>
            <li>Devenez membre premium pour postuler aux logements disponibles.</li>
          </ol>

          <p className="text-[#646492] mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 italic">
            L'accès aux candidatures est disponible à partir de 9,90 € pour un essai de 3 jours, puis
            12,49 €/mois avec un engagement d'un an, ou 34,90 €/mois sans engagement.
          </p>

          <p className="text-[#646492] mb-4">
            Sur MY APPART, tout se passe directement entre particuliers, sans frais d'agence, seulement des frais de plateforme. Un service transparent, simple, sécurisé et efficace pour trouver rapidement votre logement.
          </p>
        </div>
      </div>

      <div className="w-full" ></div>
    </div>
  );
};

export default Description;
