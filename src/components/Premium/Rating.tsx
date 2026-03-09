import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import premium from "../../assets/Premium/premiun.png";
import star from "../../assets/Premium/image 2.png";
import man1 from "../../assets/Premium/Mask.svg";
import man2 from "../../assets/Premium/Mask (2).svg";
import man3 from "../../assets/Premium/Mask (1).svg";

type TestimonialCardProps = {
  name: string;
  title: string;
  imageUrl: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, title, imageUrl }) => (
  <div className="p-6 rounded-xl flex flex-col items-start h-full">
    <div className="flex text-green-600 mb-4">
      <img src={star} alt="5 star rating" className="h-7" />
    </div>

    <p className="text-gray-700 text-sm mb-6">
      Nous avons maintenant acheté quelques propriétés auprès de ClearEquite. La plupart de mes
      interactions ont été avec Jay Luo. C'est une personne agréable et facile avec qui travailler.
      Je continuerai à travailler avec eux à l'avenir pour mes projets de rénovation.
    </p>

    <div className="flex items-center mt-auto">
      <img
        src={imageUrl}
        alt={name}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <div>
        <p className="font-semibold text-blue-900 text-sm">{name}</p>
        <p className="text-gray-500 text-xs">{title}</p>
      </div>
    </div>
  </div>
);

const Rating: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const allTestimonials = [
    { name: "Lucky Properties", title: "Senior trading analyst", imageUrl: man1 },
    { name: "Alen Jonne", title: "Senior trading analyst", imageUrl: man2 },
    { name: "Cutty Floww", title: "Senior trading analyst", imageUrl: man3 },
    { name: "Sarah Mitchell", title: "Property Investor", imageUrl: man1 },
    { name: "Michael Chen", title: "Real Estate Developer", imageUrl: man2 },
    { name: "Emma Rodriguez", title: "Investment Manager", imageUrl: man3 },
    { name: "David Park", title: "Commercial Broker", imageUrl: man1 },
    { name: "Lisa Wong", title: "Fix & Flip Expert", imageUrl: man2 },
    { name: "James Carter", title: "Multifamily Investor", imageUrl: man3 },
  ];

  const cardsPerPage = 3;
  const totalPages = Math.ceil(allTestimonials.length / cardsPerPage); // 9 items → 3 pages

  const next = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Get exactly 3 cards for current page
  const startIndex = currentPage * cardsPerPage;
  const visibleTestimonials = allTestimonials.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-col">
      <div className="w-full container mt-10 bg-white rounded-3xl">
        {/* Trustpilot Logo */}
        <div className="flex items-center mb-6">
          <img src={premium} alt="Trustpilot Logo" className="h-26 w-auto mr-4" />
        </div>

        {/* Heading + Arrows */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-medium text-blue-900 leading-snug max-w-xl">
            Une note de{" "}
            <span className="text-blue-600">4,8 sur 5 basée sur</span>{" "}
            <span className="text-blue-600">1 659</span> avis. Nos avis 4 et 5
            étoiles.
          </h2>

          <div className="flex space-x-4">
            <button
              onClick={prev}
              className="p-3 border border-gray-300 rounded-full text-blue-900 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={next}
              className="p-3 border border-gray-300 rounded-full text-blue-900 hover:bg-gray-100 transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Testimonial Cards - 3 at a time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={startIndex + idx}
              name={testimonial.name}
              title={testimonial.title}
              imageUrl={testimonial.imageUrl}
            />
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-10 space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`transition-all duration-300 rounded-full ${currentPage === index
                ? "bg-blue-600 w-10 h-3"
                : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;