import { createClient } from '@sanity/client'
import crypto from 'crypto'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export const config = {
  api: {
    bodyParser: false, // we need the raw body to verify Paystack's signature
  },
}

async function getRawBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const rawBody = await getRawBody(req)

  // Verify this request actually came from Paystack, not someone spoofing it
  const signature = req.headers['x-paystack-signature']
  const expectedSignature = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex')

  if (signature !== expectedSignature) {
    console.error('Invalid Paystack webhook signature')
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const event = JSON.parse(rawBody.toString())

  try {
    if (event.event === 'charge.success') {
      const { reference, metadata } = event.data
      const orderId = metadata?.orderId

      if (orderId) {
        await client.patch(orderId).set({ status: 'paid' }).commit()
      }
    }

    if (event.event === 'charge.failed') {
      const { metadata } = event.data
      const orderId = metadata?.orderId

      if (orderId) {
        await client.patch(orderId).set({ status: 'failed' }).commit()
      }
    }

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('paystack-webhook error:', err)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}