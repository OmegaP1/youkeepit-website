// src/app/api/admin/content/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('is_active', true)
      .order('section_name', { ascending: true })

    if (error) throw error

    return NextResponse.json({ data, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const { section_name, content_key, content_value, content_type = 'text' } = await request.json()
    
    const { data, error } = await supabase
      .from('site_content')
      .upsert({
        section_name,
        content_key,
        content_value,
        content_type,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'section_name,content_key'
      })

    if (error) throw error

    return NextResponse.json({ data, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    )
  }
}
