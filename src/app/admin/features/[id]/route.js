// src/app/api/admin/features/[id]/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('features')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
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

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    const { data, error } = await supabase
      .from('features')
      .update({ is_active: false })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    )
  }
}