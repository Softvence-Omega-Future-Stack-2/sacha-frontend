import { useState, useEffect } from 'react';

interface Image {
  id: number;
  image: string;
  is_primary: boolean;
}

interface DisplayImageProps {
  images: Image[];
}

const DisplayImage: React.FC<DisplayImageProps> = ({ images }) => {
  // State to manage which image is displayed in the large view
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    if (images && images.length > 0) {
      const primary = images.find(img => img.is_primary) || images[0];
      setMainImage(primary.image);
    } else {
      setMainImage("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800");
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="p-4 sm:p-8">
        <div className="container mx-auto">
          <div className="h-[400px] md:h-[600px] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"
              alt="Property placeholder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="container mx-auto ">
        <div className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Large Main Image Section (md:col-span-2) */}
            <div className="md:col-span-2 rounded-xl overflow-hidden h-[400px] md:h-[730px] transition-opacity duration-300 bg-gray-100">
              <img
                src={mainImage}
                alt="Property main view"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Smaller Images Section (Thumbnails, md:col-span-1) */}
            <div className="md:col-span-1 grid grid-rows-3 gap-3">
              {images.slice(0, 3).map((img, index) => (
                <div
                  key={img.id}
                  className={`rounded-xl overflow-hidden cursor-pointer transform transition-all duration-200 
                              hover:scale-[1.02] border-2 ${mainImage === img.image ? 'border-blue-500' : 'border-transparent'}
                              flex items-center justify-center bg-gray-50`}
                  onClick={() => setMainImage(img.image)}
                >
                  <img
                    src={img.image}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
              {/* If fewer than 3 images, show placeholders or just leave empty? 
                  The grid-rows-3 will handle the layout. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
