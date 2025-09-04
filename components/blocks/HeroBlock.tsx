import React from 'react'
import Image from 'next/image'

interface DirectionCard {
  title: string
  description: string
  icon?: string
  color?: string
}

interface HeroBlockProps {
  title: string
  subtitle: string
  cta: string
  directions?: DirectionCard[]
  logoUrl?: string
  variant: 'imageLeft' | 'imageFull' | 'withDirections' | 'withTeam'
  teamImage?: string
  slogan?: string
}

export function HeroBlock({ 
  title, 
  subtitle, 
  cta, 
  directions = [], 
  logoUrl,
  variant,
  teamImage,
  slogan
}: HeroBlockProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Card */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden mb-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
              {subtitle}
            </p>
            {slogan && (
              <p className="text-lg text-white/80 font-medium mb-8">
                {slogan}
              </p>
            )}
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {cta}
            </button>
          </div>
        </div>

        {/* Directions Cards - 3 cards */}
        {directions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {directions.slice(0, 3).map((direction, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <div className="text-3xl">{direction.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {direction.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {direction.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}