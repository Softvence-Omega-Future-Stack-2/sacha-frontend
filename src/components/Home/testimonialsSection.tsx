import React, { useState } from 'react';
import { ArrowLeft, ArrowRight} from 'lucide-react';
import truspilot from '../../assets/truspilot.png'
import star from '../../assets/star.png'
import user1 from '../../assets/user-1.png'
import user2 from '../../assets/user-2.png'
import user3 from '../../assets/user-3.png'

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "We have now bought a few properties from ClearEquite. Most of my interactions have been with Jay Luo. He is nice and easy person to work with. I will continue to work with them in the future for my renovation projects.",
    name: "Lucky Properties",
    role: "Senior trading analyst",
    avatar: user1,
  },
  {
    id: 2,
    text: "We have now bought a few properties from ClearEquite. Most of my interactions have been with Jay Luo. He is nice and easy person to work with. I will continue to work with them in the future for my renovation projects.",
    name: "Alen Jonne",
    role: "Senior trading analyst",
    avatar: user2,
  },
  {
    id: 3,
    text: "We have now bought a few properties from ClearEquite. Most of my interactions have been with Jay Luo. He is nice and easy person to work with. I will continue to work with them in the future for my renovation projects.",
    name: "Cutty Floww",
    role: "Senior trading analyst",
    avatar: user3,
  },
  {
    id: 4,
    text: "We have now bought a few properties from ClearEquite. Most of my interactions have been with Jay Luo. He is nice and easy person to work with. I will continue to work with them in the future for my renovation projects.",
    name: "John Smith",
    role: "Senior trading analyst",
    avatar: user3,
  },
  {
    id: 5,
    text: "We have now bought a few properties from ClearEquite. Most of my interactions have been with Jay Luo. He is nice and easy person to work with. I will continue to work with them in the future for my renovation projects.",
    name: "Sarah Johnson",
    role: "Senior trading analyst",
    avatar: user3
  }
];

const TrustpilotTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className='bg-[#F2F6FE]'>
        <div className=" max-w-6xl mx-auto bg-[#F2F6FE] py-12 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Trustpilot Logo and Rating */}
        <div className="flex items-center gap-2 mb-6">
         <img src={truspilot} alt="truspilot" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <h2 className=" sm:text-2xl lg:text-4xl text-[#061251] font-dm-sans text-3xl font-semibold leading-[120%]">
            What <span className="font-normal text-[#061251] larken-font leading-[120%]">Customers</span>
            <br />
            say about us
          </h2>
          
          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full border-2 border-[#061251] flex items-center justify-center hover:border-gray-400 transition-colors disabled:opacity-50"
              aria-label="Previous testimonials"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full border-2 border-[#061251] flex items-center justify-center hover:border-gray-400 transition-colors disabled:opacity-50"
              aria-label="Next testimonials"
            >
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative overflow-hidden mb-8">
          {/* Desktop/Tablet View - 3 columns on lg, 2 on md */}
          <div className="hidden md:block">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full lg:w-1/3 md:w-1/2 shrink-0 px-3"
                >
                  <div className="rounded-lg h-full">
                    {/* Star Rating */}
                  <img src={star} alt="star" />

                    {/* Testimonial Text */}
                    <p className="text-[#061251] text-lg leading-relaxed mb-8 mt-8">
                      {testimonial.text}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-[#061251] text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-lg text-[#061251]">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Single column with slide */}
          <div className="md:hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full shrink-0 px-3"
                >
                  <div className="rounded-lg">
                    {/* Star Rating */}
                   <img src={star} alt="start" />

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-base leading-relaxed mb-8">
                      {testimonial.text}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 text-base">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Mobile */}
        <div className="flex md:hidden justify-center gap-3">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-10 h-10 rounded-full border-2 border-[#061251] flex items-center justify-center hover:border-gray-400 transition-colors disabled:opacity-50"
            aria-label="Previous testimonials"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-10 h-10 rounded-full border-2 border-[#061251] flex items-center justify-center hover:border-gray-400 transition-colors disabled:opacity-50"
            aria-label="Next testimonials"
          >
            <ArrowRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TrustpilotTestimonials;