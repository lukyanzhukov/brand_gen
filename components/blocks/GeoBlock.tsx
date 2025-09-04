import React from 'react'

interface Location {
  city: string
  country: string
  description?: string
  type?: string
  image?: string
}

interface GeoBlockProps {
  title: string
  subtitle?: string
  locations: Location[]
  variant: string
  mapImage?: string
}

export function GeoBlock({ title, subtitle, locations = [], variant, mapImage }: GeoBlockProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-r from-pink-400 to-red-500 rounded-3xl p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {location.city}, {location.country}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {location.description || location.type}
                  </p>
                  {location.image && (
                    <div className="mt-4 w-full h-20 relative">
                      <img
                        src={location.image}
                        alt={location.city}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}