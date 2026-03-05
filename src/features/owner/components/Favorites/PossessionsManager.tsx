
import Title from "../Title"
import Card from "./Card"
import { useState } from "react"

import img1 from '../../../../assets/dashboard/h1.jpg'
import img2 from '../../../../assets/dashboard/h2.jpg'
import img3 from '../../../../assets/dashboard/h3.jpg'
import img4 from '../../../../assets/dashboard/h4.jpg'
import img5 from '../../../../assets/dashboard/h5.jpg'
import img6 from '../../../../assets/dashboard/h6.jpg'

// Dummy data array
const properties = [
  { price: "585", title: "Appartement moderne T3 – Marais", location: "Malibu, California", image: img1 },
  { price: "585", title: "Appartement moderne T8 – Marais", location: "Malibu, California", image: img2 },
  { price: "855", title: "Appartement moderne T3 - Marais", location: "Harbor City, Sydney", image: img3 },
  { price: "589", title: "Appartement moderne T2 – Marais", location: "Malibu, California", image: img4 },
  { price: "581", title: "Appartement moderne T13 – Marais", location: "Malibu, California", image: img5 },
  { price: "580", title: "Appartement moderne T11 – Marais", location: "Manhattan, NYC", image: img6 },
  { price: "585", title: "Appartement moderne T10 – Marais", location: "Times Square, NYC", image: img1 },
  { price: "585", title: "Appartement moderne T17 – Marais", location: "Downtown, Sydney", image: img2 },
  { price: "585", title: "Appartement moderne T18 – Marais", location: "Malibu, California", image: img2 },
  { price: "585", title: "Appartement moderne T9 – Marais", location: "Malibu, California", image: img4 },
  { price: "585", title: "Appartement moderne T5 – Marais", location: "Malibu, California", image: img5 },
  { price: "585", title: "Appartement moderne T15 – Marais", location: "Malibu, California", image: img6 },
  { price: "585", title: "Appartement moderne T17 – Marais", location: "Malibu, California", image: img1 },
  { price: "585", title: "Appartement moderne T14 – Marais", location: "Malibu, California", image: img2 },
]

const ITEMS_PER_PAGE = 8

const PossessionsManager: React.FC = () => {
  // Track how many items are currently visible
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  
  // New state to control the loading spinner
  const [loading, setLoading] = useState(false)

  // Slice the array to show only visible items
  const visibleProperties = properties.slice(0, visibleCount)
  
  // Check if there are more items to load
  const hasMore = visibleCount < properties.length

  // Load next batch of items
  const handleViewMore = () => {
    setLoading(true)                    // Show loader
    
    // Small delay so the loader is visible even if data loads instantly
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, properties.length))
      setLoading(false)                // Hide loader
      window.scrollBy({ top: 300, behavior: "smooth" })
    }, 400)
  }

  return (
    <div className="bg-white">
      <div>
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
          <Title
            title="My Possessions"
            paragraph="Manage your assets and applications in the blink of an eye"
          />
       
        </header>

        {/* Cards Grid - shows already loaded + newly loaded cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {visibleProperties.map((property, index) => (
            <Card
              key={index}
              price={property.price}
              title={property.title}
              location={property.location}
              image={property.image} onRemove={function (): void {
                throw new Error("Function not implemented.")
              } }            />
          ))}
        </div>

        {/* View More Button / Loader */}
           
        {hasMore && (
          <div className="flex justify-center pb-12">
            {loading ? (
              <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-3">Loading more...</p>
              </div>
            ) : (
              <button
                onClick={handleViewMore}
                className="px-10 py-4 bg-white border mt-4 cursor-pointer border-[#646492] rounded-xl text-sm font-bold text-[#061251] uppercase tracking-wider hover:border-gray-400 transition-all duration-200"
              >
                View More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PossessionsManager