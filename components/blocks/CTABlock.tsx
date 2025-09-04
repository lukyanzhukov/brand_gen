import React from 'react'

interface CTABlockProps {
  title: string
  description: string
  buttonText: string
  buttonUrl: string
  variant: string
}

export function CTABlock({ title, description, buttonText, buttonUrl, variant }: CTABlockProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-12 shadow-2xl text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
              {description}
            </p>
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}