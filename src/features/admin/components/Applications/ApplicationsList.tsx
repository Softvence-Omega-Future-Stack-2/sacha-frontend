import { useState } from 'react';
import Title from "../Title";

// Illustration for incomplete state
import gellaryIcon from '../../../../assets/dashboard/gellary.png';
import PremiumMember from './PremiumMember';


const ApplicationsList = () => {
  // Track whether the tenant file has been completed
  const [isFileCompleted, setIsFileCompleted] = useState(false);

  // Handler when user clicks the "Complete my file" button
  const handleCompleteFile = () => {
    setIsFileCompleted(true);
    // In a real app you might open a modal, navigate, or send data here
  };

  // Content shown when the file is not completed yet
  const incompleteContent = (
    <>
      <Title title='Applications' paragraph='Manage your assets and applications in the blink of an eye' />
      <div className="mx-auto bg-[#F8FBFF] rounded-lg border border-[#E5ECF6] p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="relative w-28 h-28 mb-8">
            <img src={gellaryIcon} className="h-28 w-28" alt="Tenant File Icon" />
          </div>

          {/* Title & description */}
          <h2 className="text-2xl w-full lg:w-2/7 font-medium text-[#061251] mb-4">
            See all Premium members application file!
          </h2>

          {/* Button that switches to the completed view */}
          <button
            onClick={handleCompleteFile}
            className="px-8 py-3  cursor-pointer uppercase text-white font-medium bg-[#256AF4] rounded-lg hover:bg-blue-700 transition duration-150"
          >
            See file
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div>
      {/* Conditional rendering */}
      {isFileCompleted ? <PremiumMember /> : incompleteContent}
    </div>
  );
};

export default ApplicationsList;