import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// FAQ item type
type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

// Data
const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'À quoi sert HelloAppart ?',
    answer: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, Lorem ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 2,
    question: 'Comment fonctionne l\'essai payant ?',
    answer: 'L\'essai payant vous donne accès à toutes les fonctionnalités premium pendant une durée limitée. Vous pouvez postuler à un nombre illimité d\'appartements et utiliser notre processus sécurisé de soumission de documents. Vous pouvez annuler à tout moment avant la fin de l\'essai pour éviter d\'être facturé.',
  },
  {
    id: 3,
    question: 'L\'abonnement est-il sans engagement ?',
    answer: 'Oui, absolument. Notre abonnement est sans engagement. Vous pouvez annuler votre adhésion à tout moment directement depuis les paramètres de votre compte, sans frais cachés ni pénalités.',
  },
  {
    id: 4,
    question: 'Qu\'est-ce que DossierFacile ?',
    answer: 'DossierFacile est un service public gratuit fourni par le gouvernement français pour simplifier la création d\'un dossier de candidature locative. Il aide les locataires à créer un dossier clair, complet et sécurisé à envoyer aux propriétaires.',
  },
  {
    id: 5,
    question: 'Avez-vous un service client ?',
    answer: 'Oui, nous avons un service client dédié prêt à vous aider. Vous pouvez nous contacter par e-mail, téléphone ou via le chat en direct disponible sur notre site web pendant les heures d\'ouverture.',
  },
];

// Reusable Accordion Item component (now properly typed)
const AccordionItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  toggleItem: (id: number) => void;
}> = ({ item, isOpen, toggleItem }) => {
  return (
    <div className="bg-[rgba(238,245,253,0.30)] mb-2 rounded-lg border-white">
      <button
        className="w-full text-left py-6 px-4 flex justify-between items-center transition-all duration-300"
        onClick={() => toggleItem(item.id)}
      >
        <h3 className={`text-lg font-semibold ${isOpen ? 'text-blue-900' : 'text-gray-900'}`}>
          {item.question}
        </h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`py-4 px-4 text-gray-700 ${isOpen ? 'block' : 'hidden'}`}>
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  // Properly typed state: number | null
  const [openItemId, setOpenItemId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 mb-4 flex justify-center">
      <div className="w-full container mx-auto">

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-[#061251] mb-2">
            Toujours pas<span className="larken-font font-normal text-[#061251]"> convaincu?</span>
          </h1>
          <p className="text-[#061251] text-lg">
            Foire Aux Questions
          </p>
        </div>

        {/* Accordion Container */}
        <div className="bg-[#ffffff] rounded-xl overflow-hidden">

          {/* First Item (special styling) */}
          <div className="bg-[#EEF5FD] p-6 mb-3 rounded-xl">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => toggleItem(faqItems[0].id)}
            >
              <h3 className="text-lg font-semibold text-blue-900">
                {faqItems[0].question}
              </h3>
              {openItemId === faqItems[0].id ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openItemId === faqItems[0].id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
            >
              <p className="text-gray-700">{faqItems[0].answer}</p>
            </div>
          </div>

          {/* Remaining Items */}
          <div className="rounded-lg border-white">
            {faqItems.slice(1).map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openItemId === item.id}
                toggleItem={toggleItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;