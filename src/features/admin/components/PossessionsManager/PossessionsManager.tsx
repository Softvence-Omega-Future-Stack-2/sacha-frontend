import { Heart } from "lucide-react"
import Title from "../Title"
import Card from "./Card"
import { useState } from "react"

import img1 from '../../../../assets/dashboard/h1.jpg'
import img2 from '../../../../assets/dashboard/h2.jpg'
import img3 from '../../../../assets/dashboard/h3.jpg'
import img4 from '../../../../assets/dashboard/h4.jpg'
import img5 from '../../../../assets/dashboard/h5.jpg'
import img6 from '../../../../assets/dashboard/h6.jpg'

const properties = [
  { id: "1", price: "585", title: "Appartement moderne T3 – Marais", location: "Malibu, California", image: img1 },
  { id: "2", price: "585", title: "Appartement moderne T8 – Marais", location: "Malibu, California", image: img2 },
  { id: "3", price: "855", title: "Appartement moderne T3 - Marais", location: "Harbor City, Sydney", image: img3 },
  { id: "4", price: "589", title: "Appartement moderne T2 – Marais", location: "Malibu, California", image: img4 },
  { id: "5", price: "581", title: "Appartement moderne T13 – Marais", location: "Malibu, California", image: img5 },
  { id: "6", price: "580", title: "Appartement moderne T11 – Marais", location: "Manhattan, NYC", image: img6 },
  { id: "7", price: "585", title: "Appartement moderne T10 – Marais", location: "Times Square, NYC", image: img1 },
  { id: "8", price: "585", title: "Appartement moderne T17 – Marais", location: "Downtown, Sydney", image: img2 },
  { id: "9", price: "585", title: "Appartement moderne T18 – Marais", location: "Malibu, California", image: img2 },
  { id: "10", price: "585", title: "Appartement moderne T9 – Marais", location: "Malibu, California", image: img4 },
  { id: "11", price: "585", title: "Appartement moderne T5 – Marais", location: "Malibu, California", image: img5 },
  { id: "12", price: "585", title: "Appartement moderne T15 – Marais", location: "Malibu, California", image: img6 },
  { id: "13", price: "585", title: "Appartement moderne T17 – Marais", location: "Malibu, California", image: img1 },
  { id: "14", price: "585", title: "Appartement moderne T14 – Marais", location: "Malibu, California", image: img2 },
]

const ITEMS_PER_PAGE = 8

const PossessionsManager: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [loading, setLoading] = useState(false)

  // Start with all properties as favorite
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    properties.map(p => p.id)
  )

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    )
  }

  const favoriteProperties = properties.filter(p => favoriteIds.includes(p.id))
  const visibleProperties = favoriteProperties.slice(0, visibleCount)
  const hasMore = visibleCount < favoriteProperties.length

  const handleViewMore = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, favoriteProperties.length))
      setLoading(false)
      window.scrollBy({ top: 300, behavior: "smooth" })
    }, 400)
  }

  return (
    <div className="bg-white">
      <div>
        <header className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
          <Title
            title="My Possessions"
            paragraph="Manage your assets and applications in the blink of an eye"
          />
      
        </header>

        {favoriteProperties.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-20 h-20 mx-auto text-gray-300 mb-6" />
            <p className="text-2xl font-semibold text-gray-700">No favorite items yet</p>
            <p className="text-gray-500 mt-3">Click the heart icon on any property to save it here</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleProperties.map((property) => (
                <Card
                  key={property.id}
                  id={property.id}
                  price={property.price}
                  title={property.title}
                  location={property.location}
                  image={property.image}
                  isFavorite={favoriteIds.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                  favoriteIds={favoriteIds}  
                />
              ))}
            </div>

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
          </>
        )}
      </div>
    </div>
  )
}

export default PossessionsManager