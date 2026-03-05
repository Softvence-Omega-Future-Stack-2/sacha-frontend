import { useState } from 'react';
import Title from "../Title";

// Illustration for incomplete state
import cameraIcon from '../../../../assets/dashboard/camera.png';
import GeneralInfo from './GeneralInfo';


const SearchHistory = () => {
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
      <Title title='My Search' paragraph='Manage your assets and applications in the blink of an eye' />
      <div className="mx-auto bg-[#F8FBFF] rounded-lg border border-[#E5ECF6] p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="relative w-28 h-28 mb-8">
            <img src={cameraIcon} className="h-28 w-28" alt="Tenant File Icon" />
          </div>

          {/* Title & description */}
          <h2 className="text-2xl w-full lg:w-2/7 font-medium text-[#061251] mb-4">
            Describe the type of accommodation <span className="italic font-semibold">you are looking for</span>
          </h2>

          <p className="text-[#646492] max-w-lg mb-8">
            In order for My Appart to connect you with the right landlords, we need to know what your dream accommodation is!
          </p>

          {/* Button that switches to the completed view */}
          <button
            onClick={handleCompleteFile}
            className="px-8 py-3  cursor-pointer text-white font-medium bg-[#256AF4] rounded-lg hover:bg-blue-700 transition duration-150"
          >
            I describe my research
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div>
      {/* Conditional rendering */}
      {isFileCompleted ? <GeneralInfo /> : incompleteContent}
    </div>
  );
};

export default SearchHistory;