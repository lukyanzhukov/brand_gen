import React from 'react'
import Image from 'next/image'

interface Achievement {
  number: string
  label: string
  description?: string
  image?: string
}

interface AboutBlockProps {
  title: string
  content: string
  bullets?: string[]
  slogan?: string
  achievements?: Achievement[]
  companyImage?: string
  socialLinks?: any[]
  variant: 'withImage' | 'withAchievements' | 'withHighlights'
}

export function AboutBlock({
  title,
  content,
  bullets = [],
  slogan,
  achievements = [],
  companyImage,
  socialLinks = [],
  variant
}: AboutBlockProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden mb-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            {/* Header inside card */}
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {title}
              </h2>
              {slogan && (
                <p className="text-xl text-white/90 font-semibold mb-8">
                  {slogan}
                </p>
              )}
              <p className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto">
                {content}
              </p>
            </div>

            {/* Achievements Grid */}
            {achievements.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {achievement.number}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {achievement.label}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.image && (
                      <div className="mt-4 w-full h-24 relative">
                        <Image
                          src={achievement.image}
                          alt={achievement.label}
                          fill
                          className="object-cover rounded-2xl"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}