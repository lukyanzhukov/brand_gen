'use client'

import { useState, useEffect } from 'react'

export default function DebugPreviewPage() {
  const [previewData, setPreviewData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Получаем данные из localStorage
    const data = localStorage.getItem('previewData')
    if (data) {
      try {
        const parsed = JSON.parse(data)
        setPreviewData(parsed)
        console.log('Preview data:', parsed)
      } catch (error) {
        console.error('Error parsing preview data:', error)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!previewData) {
    return <div>No preview data found</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Preview Data</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Layout Blocks:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(previewData.layout?.blocks, null, 2)}
          </pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Copy Data:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(previewData.copy, null, 2)}
          </pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Palette:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(previewData.palette, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
