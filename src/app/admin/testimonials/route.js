// src/app/api/admin/testimonials/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) throw error

    return NextResponse.json({ data, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('testimonials')
      .insert([body])
      .select()

    if (error) throw error

    return NextResponse.json({ data: data[0], success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    )
  }
}