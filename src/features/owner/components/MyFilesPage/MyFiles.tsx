import { useState } from 'react';
import Title from "../Title";

// Illustration for incomplete state
import cmntIcon from '../../../../assets/dashboard/cmnt.png';
import ProfileForm from '../Profile';

const MyFiles = () => {
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
      <Title title='My Files' paragraph='Manage your assets and applications in the blink of an eye' />
      <div className="mx-auto bg-[#F8FBFF] rounded-lg border border-[#E5ECF6] p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="relative w-28 h-28 mb-8">
            <img src={cmntIcon} className="h-28 w-28" alt="Tenant File Icon" />
          </div>

          {/* Title & description */}
          <h2 className="text-2xl font-medium text-[#061251] mb-4">
            It's Time To Create <span className="italic font-semibold">Your Tenant File</span>
          </h2>

          <p className="text-[#646492] max-w-lg mb-8">
            To start promoting your profile, we need your tenant application. Fill it out just
            once, and My Appart will take care of sending it to hundreds of landlords.
          </p>

          {/* Button that switches to the completed view */}
          <button
            onClick={handleCompleteFile}
            className="px-8 py-3  cursor-pointer text-white font-medium bg-[#256AF4] rounded-lg hover:bg-blue-700 transition duration-150"
          >
            I AM COMPLETING MY FILE
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div>
      {/* Conditional rendering */}
      {isFileCompleted ? <ProfileForm /> : incompleteContent}
    </div>
  );
};

export default MyFiles;