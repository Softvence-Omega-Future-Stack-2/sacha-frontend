import React from 'react';
import roomIcon from '../../assets/productDetails/room.svg';
import surfaceIcon from '../../assets/productDetails/surface.svg';
import piecesIcon from '../../assets/productDetails/piece.svg';
import floorIcon from '../../assets/productDetails/floor.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/featuresAPI/auth/auth.slice';
import { useGetSubscriptionStatusQuery } from '../../redux/featuresAPI/subscription/subscription.api';
import { useCreatePossessionMutation } from '../../redux/featuresAPI/tenant/possessions.api';
import toast, { Toaster } from 'react-hot-toast';

// Type for Detail Item
type DetailItemProps = {
  icon: string;
  label: string;
  value: string;
};

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex justify-between items-center py-4">
    <div className="flex items-center space-x-4">
      <img src={icon} alt={label} className="h-6 w-6" />
      <span className="text-lg font-medium text-gray-800">{label}</span>
    </div>
    <span className="text-lg font-normal text-[#646492]">{value}</span>
  </div>
);

interface PropertyOverviewProps {
  ad: any;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ ad }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data: statusData, isLoading: isCheckingSubscription } = useGetSubscriptionStatusQuery({}, { skip: !user || user.role !== 'tenant' });
  const [createPossession, { isLoading: isApplying }] = useCreatePossessionMutation();

  const isTenant = user?.role === 'tenant';
  const hasSubscription = statusData?.has_subscription || statusData?.status === 'active';

  const handleApplyClick = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour postuler à ce bien.');
      navigate('/login');
      return;
    }

    if (!isTenant) {
      toast.error('Seuls les locataires peuvent postuler à des biens.');
      return;
    }

    if (!hasSubscription) {
      toast.error('Vous devez avoir un abonnement Premium actif pour postuler.');
      navigate('/subscription');
      return;
    }

    try {
      await createPossession({ ad: ad.id }).unwrap();
      toast.success('Votre candidature a été envoyée avec succès au propriétaire !');
    } catch (error: any) {
      console.error('Erreur de candidature:', error);
      // Handle potential duplicate applications based on API response structure
      const errorMsg = error?.data?.ad?.[0] || error?.data?.non_field_errors?.[0] || error?.data?.message || 'Échec de la soumission de la candidature. Vous avez peut-être déjà postulé ou une erreur s\'est produite.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 py-10 relative">
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2">
          {ad.furnished && (
            <div className="inline-block px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full mb-6">
              Meublé
            </div>
          )}

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Aperçu de la propriété</h2>

          <p className="text-[#646492] text-[16px] mb-8">
            Réf: {ad.id}
          </p>

          <div className="divide-y divide-gray-200">
            <DetailItem icon={surfaceIcon} label="Surface" value={`${ad.surface_sqm} m2`} />
            <DetailItem icon={piecesIcon} label="Pieces" value={ad.pieces.toString()} />
            <DetailItem icon={roomIcon} label="Rooms" value={ad.rooms.toString()} />
            <DetailItem icon={floorIcon} label="Floor" value={ad.floor.toString()} />
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-[#EAF3FF] p-6 rounded-xl text-center shadow-sm border border-blue-50">
            <h3 className="text-xl font-medium text-[#061251] mb-4">
              Êtes-vous intéressé par cette annonce ?
            </h3>
            <p className="text-sm font-light text-[#061251] mb-6">
              Postulez maintenant pour partager votre profil avec le propriétaire de ce bien.
            </p>

            <button
              onClick={handleApplyClick}
              disabled={isCheckingSubscription || isApplying}
              className={`w-full text-white font-semibold py-3 rounded-lg transition duration-150 shadow-md ${isCheckingSubscription || isApplying ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#256AF4] hover:bg-blue-700'
                }`}
            >
              {isCheckingSubscription ? 'Checking Status...' : isApplying ? 'Applying...' : 'APPLY'}
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
