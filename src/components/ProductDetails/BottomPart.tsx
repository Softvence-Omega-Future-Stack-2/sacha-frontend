interface BottomPartProps {
  ad: any;
}

const BottomPart: React.FC<BottomPartProps> = ({ ad }) => {
  const selectedDPE = ad.dpe || 'D';
  const selectedGES = ad.ghg || 'B';

  const dpeClasses = [
    { label: 'A', color: 'bg-green-600' },
    { label: 'B', color: 'bg-green-400' },
    { label: 'C', color: 'bg-lime-400' },
    { label: 'D', color: 'bg-yellow-400' },
    { label: 'E', color: 'bg-orange-400' },
    { label: 'F', color: 'bg-red-500' },
    { label: 'G', color: 'bg-red-700' },
  ] as const;

  const gesClasses = [
    { label: 'A', color: 'bg-purple-900', textColor: 'text-white' },
    { label: 'B', color: 'bg-purple-700', textColor: 'text-white' },
    { label: 'C', color: 'bg-purple-500', textColor: 'text-white' },
    { label: 'D', color: 'bg-purple-400', textColor: 'text-white' },
    { label: 'E', color: 'bg-purple-300' },
    { label: 'F', color: 'bg-purple-200' },
    { label: 'G', color: 'bg-purple-100' },
  ] as const;

  // Split service_tags string into array
  const amenities = ad.service_tags?.[0]?.split(',').map((s: string) => s.trim()) || [];

  // Properly typed RatingScale component
  type RatingScaleProps = {
    title: string;
    subtitle: string;
    classes: ReadonlyArray<{
      label: string;
      color: string;
      textColor?: string;
    }>;
    selectedLabel: string;
  };

  const RatingScale: React.FC<RatingScaleProps> = ({
    title,
    subtitle,
    classes,
    selectedLabel,
  }) => (
    <div>
      <h3 className="text-2xl font-semibold text-blue-900 mb-6">{title}</h3>
      <p className="text-sm font-medium text-gray-700 mb-1">{subtitle}</p>
      <div className="flex w-full max-w-sm border border-gray-300 rounded overflow-hidden shadow-md">
        {classes.map((item) => {
          const isSelected = item.label === selectedLabel;
          return (
            <div
              key={item.label}
              className={`flex-1 flex items-center justify-center p-2 text-base font-bold 
                          ${item.color} ${item.textColor || 'text-black'} 
                          ${isSelected ? 'scale-105 z-10 border-2 border-black' : 'opacity-40'} 
                          relative transform transition-all duration-300 ease-in-out z-0`}
            >
              <span className={isSelected ? 'font-extrabold text-lg' : ''}>{item.label}</span>
              {title === 'GES' && isSelected && <div className="absolute inset-0 bg-black/10"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto mt-8 pb-20 px-4 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* DPE Section */}
        <RatingScale
          title="DPE"
          subtitle="Classe Energie"
          classes={dpeClasses}
          selectedLabel={selectedDPE}
        />

        {/* GES Section */}
        <RatingScale
          title="GES"
          subtitle="GES"
          classes={gesClasses}
          selectedLabel={selectedGES}
        />

        {/* Prestations Section */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6">Equipment</h3>
          <div className="bg-blue-50 py-4 px-6 inline-block rounded-xl shadow-sm border border-blue-100">
            <span className="text-xl font-semibold text-[#061251]">{amenities[0] || 'Standard'}</span>
          </div>
        </div>
      </div>

      {/* Amenity Tags */}
      {amenities.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-2xl font-semibold text-blue-900 mb-6">Tags</h3>
          <div className="flex flex-wrap gap-4">
            {amenities.map((tag: string) => (
              <div
                key={tag}
                className="px-6 py-2 bg-white text-gray-800 font-medium rounded-full 
                            border border-gray-200 transition duration-150 hover:bg-gray-50 hover:border-blue-300 shadow-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomPart;
