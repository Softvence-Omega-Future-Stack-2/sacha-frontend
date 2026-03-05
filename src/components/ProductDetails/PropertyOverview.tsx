import React from 'react';
import roomIcon from '../../assets/productDetails/room.svg';
import surfaceIcon from '../../assets/productDetails/surface.svg';
import piecesIcon from '../../assets/productDetails/piece.svg';
import floorIcon from '../../assets/productDetails/floor.svg';
import { useNavigate } from 'react-router-dom';

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

  const handleApplyClick = () => {
    navigate('/premium');
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2">
          {ad.furnished && (
            <div className="inline-block px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full mb-6">
              Furnished
            </div>
          )}

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Property Overview</h2>

          <p className="text-[#646492] text-[16px] mb-8">
            Ref: {ad.id}
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
              Are you interested in this ad?
            </h3>
            <p className="text-sm font-light text-[#061251] mb-6">
              Apply now to share your profile with the owner of this property.
            </p>

            <button
              onClick={handleApplyClick}
              className="w-full bg-[#256AF4] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-150 shadow-md"
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
