import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Data structure for the FAQ items
const faqItems = [
  {
    id: 1,
    question: 'What is HelloAppart used for?',
    answer: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, Lorem ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 2,
    question: 'How does the paid trial work?',
    answer: 'The paid trial gives you full access to all premium features for a limited time. You can apply to unlimited apartments and utilize our secure document submission process. You can cancel anytime before the trial ends to avoid being charged.',
  },
  {
    id: 3,
    question: 'Is the subscription commitment-free?',
    answer: 'Yes, absolutely. Our subscription is commitment-free. You can cancel your membership at any time directly from your account settings, with no hidden fees or penalties.',
  },
  {
    id: 4,
    question: 'What is DossierFacile?',
    answer: 'DossierFacile is a free public service provided by the French government to simplify the creation of a rental application file (dossier). It helps tenants create a clear, complete, and secure file to send to landlords.',
  },
  {
    id: 5,
    question: 'Do you have a customer service department?',
    answer: 'Yes, we have a dedicated customer service department ready to assist you. You can reach us via email, phone, or through the live chat available on our website during business hours.',
  },
] as const; // <-- added "as const" so ids are literal types

// Define the type for a single FAQ item
type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

// Reusable Accordion Item component
const AccordionItem = ({
  item,
  isOpen,
  toggleItem,
}: {
  item: FAQItem;
  isOpen: boolean;
  toggleItem: (id: number) => void;
}) => {
  return (
    <div className=" bg-[rgba(238,245,253,0.30)] mb-2 rounded-lg border-white">
      <button 
        className="w-full text-left py-6 px-4 flex justify-between items-center transition-all duration-300"
        onClick={() => toggleItem(item.id)}
      >
        <h3 className={`text-lg font-semibold ${isOpen ? 'text-blue-900' : 'text-gray-900'}`}>
          {item.question}
        </h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      
      {/* Content Area */}
      <div 
        className={`overflow-hidden  transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`py-4 px-4 text-gray-700 ${isOpen ? 'block' : 'hidden'}`}>
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection2 = () => {
  // State to manage which item is currently open (null for none, number for specific item)
  const [openItemId, setOpenItemId] = useState<number | null>(1); // <-- proper type instead of just number

  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className=" bg-white px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-7xl mx-auto">

        {/* Accordion Container */}
        <div className="bg-[#ffffff] rounded-xl overflow-hidden">
          
          {/* First Item (Styling matches the image where the first item is distinct and open) */}
          <div className="bg-[#EEF5FD] p-6 mb-3  rounded-xl">
            <button 
              className="w-full text-left flex justify-between items-center"
              onClick={() => toggleItem(faqItems[0].id)}
            >
              <h3 className="text-lg font-semibold text-blue-900">
                {faqItems[0].question}
              </h3>
              {openItemId === faqItems[0].id ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openItemId === faqItems[0].id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-gray-700">{faqItems[0].answer}</p>
            </div>
          </div>
          
          {/* Remaining Items (Standard Accordion styling) */}
          <div className=" rounded-lg  border-white">
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

export default FAQSection2;