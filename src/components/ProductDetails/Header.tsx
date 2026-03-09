import arrowLeft from '../../assets/productDetails/arrow-left.svg'
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useCreateConversationMutation } from "../../features/chat/api/chat.api";
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/featuresAPI/auth/auth.slice';

interface HeaderProps {
  ad: any;
}

const Header: React.FC<HeaderProps> = ({ ad }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [createConversation, { isLoading: isCreating }] = useCreateConversationMutation();

  const handelBack = () => {
    navigate(-1)
  };

  const handleMessageOwner = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!ad?.owner) return; // or ad.owner_id

    try {
      const result = await createConversation({ participant_id: ad.owner }).unwrap();

      // Determine redirect path based on user role
      const redirectPath = user.role === 'owner'
        ? '/dashboard-owner/messages'
        : '/dashboard-tenant/messages';

      navigate(redirectPath, { state: { conversationId: result.id } });
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };
  return (
    // Outer container with the light blue-gray background color and overall padding
    <div className=" bg-gradient-to-b from-[rgba(37,99,235,0.20)] to-[rgba(37,99,235,0.20)] p-8">
      {/* Card-like container for the content, simulating the main light blue background */}
      <div className=" p-6 sm:p-10 container mx-auto ">

        {/* Top section: Back button */}
        <div className="mb-8">
          <button
            className="flex items-center text-blue-800 hover:text-blue-600 transition duration-150"
            onClick={handelBack}
          >
            <img src={arrowLeft} alt="Back" className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium text-[#061251] ">Dos</span>
          </button>
        </div>

        {/* Main Content Area: Title, Address, and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline">

          {/* Left Side: Title and Address */}
          <div className="mb-4 md:mb-0">

            <h1 className="text-2xl sm:text-4xl font-sans font-semibold text-[#061251] leading-tight tracking-tight">
              {ad.title}
            </h1>

            {/* Address */}
            <p className="text-lg text-[#061251] mt-2">
              {ad.display_address || ad.address}
            </p>
          </div>

          {/* Right Side: Price and Message Button */}
          <div className="flex flex-col items-end gap-4">
            <span className="text-3xl sm:text-3xl font-normal text-[#061251]">
              €{parseFloat(ad.rent).toLocaleString()}
            </span>

            <button
              onClick={handleMessageOwner}
              disabled={isCreating}
              className="flex items-center gap-2 px-6 py-3 bg-[#1077FF] text-white rounded-lg font-semibold hover:bg-[#006CFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isCreating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <MessageSquare className="w-5 h-5" />
              )}
              Propriétaire du message
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
