import { NextRequest, NextResponse } from 'next/server'
import { resolveEmployerIdFromUrl } from '@/lib/hh'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    
    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
    }

    const employerId = await resolveEmployerIdFromUrl(url)
    
    if (!employerId) {
      return NextResponse.json({ error: 'Could not resolve employer ID from URL' }, { status: 404 })
    }

    return NextResponse.json({ employerId })
  } catch (error) {
    console.error('Error resolving employer ID:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
