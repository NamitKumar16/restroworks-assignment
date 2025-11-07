import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  source?: string
  honeypot?: string
}

export const GET = async () => NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as ContactPayload
    const { name, email, message, honeypot, ...rest } = body

    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({ message: 'Spam detected' }, { status: 400 })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({
      config: configPromise,
    })

    await payload.create({
      collection: 'contacts',
      data: {
        name,
        email,
        message,
        ...rest,
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact entry:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
