interface FeatureCardProps { title: string; description: string; icon: React.ReactNode; }

const FeatureCard = ({ title, description, icon: IconComponent }:FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-solid border-[rgba(6,18,81,0.20)] p-6 flex flex-col items-center text-center h-full">
      {/* Icon Container */}
      <div className="w-28 h-28 mb-4 flex items-center justify-center bg-[#F5FAFF] rounded-lg">
        {/* The IconComponent should be rendered here. In a real app, you'd use an SVG or a library like Lucide/Heroicons */}
        {IconComponent}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;