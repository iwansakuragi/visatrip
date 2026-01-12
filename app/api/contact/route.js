import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// Rate limiting helper (simple in-memory)
const rateLimitMap = new Map()

function rateLimit(identifier) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5 // max 5 requests per minute

  const userRequests = rateLimitMap.get(identifier) || []
  const recentRequests = userRequests.filter(time => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return false
  }

  recentRequests.push(now)
  rateLimitMap.set(identifier, recentRequests)
  return true
}

// Input sanitization
function sanitizeInput(str) {
  return str.trim().replace(/[<>]/g, '')
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone
function isValidPhone(phone) {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
  return phoneRegex.test(phone.replace(/[\s-]/g, ''))
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Rate limiting
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, phone, service_type, message } = body

    // Validation
    if (!name || !email || !phone || !service_type || !message) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      )
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Format nomor telepon tidak valid' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      service_type: sanitizeInput(service_type),
      message: sanitizeInput(message)
    }

    // Insert to database
    const result = await query(
      `INSERT INTO contacts (name, email, phone, service_type, message, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.phone,
        sanitizedData.service_type,
        sanitizedData.message,
        'new'
      ]
    )

    console.log('✅ Contact form submitted:', result.rows[0])

    // TODO: Send email notification (opsional - nanti)
    // await sendEmailNotification(sanitizedData)

    return NextResponse.json(
      {
        success: true,
        message: 'Pesan Anda berhasil dikirim',
        data: {
          id: result.rows[0].id,
          created_at: result.rows[0].created_at
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('❌ Contact form error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}