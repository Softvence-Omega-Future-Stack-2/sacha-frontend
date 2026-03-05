import { useParams } from "react-router-dom";
import BottomPart from "../../components/ProductDetails/BottomPart";
import Description from "../../components/ProductDetails/Description";
import DisplayImage from "../../components/ProductDetails/DisplayImage";
import Header from "../../components/ProductDetails/Header";
import PropertyOverview from "../../components/ProductDetails/PropertyOverview";
import { useGetPublicAdByIdQuery } from "../../redux/featuresAPI/owner/owner.api";

const SkeletonHeader = () => (
  <div className="bg-gradient-to-b from-[rgba(37,99,235,0.10)] to-[rgba(37,99,235,0.10)] p-8 animate-pulse">
    <div className="container mx-auto p-6 flex flex-col md:flex-row justify-between items-start md:items-baseline">
      <div className="w-full md:w-2/3">
        <div className="h-4 w-16 bg-blue-200 mb-6 rounded"></div>
        <div className="h-10 w-3/4 bg-blue-200 mb-4 rounded"></div>
        <div className="h-6 w-1/2 bg-blue-200 rounded"></div>
      </div>
      <div className="h-10 w-32 bg-blue-200 rounded-lg mt-4 md:mt-0"></div>
    </div>
  </div>
);

const SkeletonImage = () => (
  <div className="p-4 sm:p-8 animate-pulse">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 h-[400px] md:h-[600px] bg-gray-200 rounded-xl"></div>
      <div className="md:col-span-1 grid grid-rows-3 gap-3">
        <div className="bg-gray-200 rounded-xl h-48"></div>
        <div className="bg-gray-200 rounded-xl h-48"></div>
        <div className="bg-gray-200 rounded-xl h-48"></div>
      </div>
    </div>
  </div>
);

const SkeletonOverview = () => (
  <div className="container mx-auto px-4 lg:px-0 py-10 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between border-b pb-4">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-1 h-64 bg-gray-100 rounded-xl"></div>
    </div>
  </div>
);

const Details = () => {
  const { id } = useParams();
  const { data: ad, isLoading, isError } = useGetPublicAdByIdQuery(id!);

  if (isLoading) {
    return (
      <>
        <SkeletonHeader />
        <SkeletonImage />
        <SkeletonOverview />
      </>
    );
  }

  if (isError || !ad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold text-[#061251] mb-2">Failed to load property details</h2>
          <p className="text-gray-500 mb-6">The property you are looking for may have been removed or is currently unavailable.</p>
          <button onClick={() => window.history.back()} className="px-8 py-3 bg-[#1077FF] text-white rounded-lg font-semibold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header ad={ad} />
      <DisplayImage images={ad.images} />
      <PropertyOverview ad={ad} />
      <Description ad={ad} />
      <BottomPart ad={ad} />
    </>
  );
};

export default Details;
