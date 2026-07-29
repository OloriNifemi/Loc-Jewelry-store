import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { orderId, email, amount } = req.body

  if (!orderId || !email || !amount) {
    return res.status(400).json({ error: 'Missing orderId, email, or amount' })
  }

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100),
        callback_url: `${process.env.SITE_URL}/order-success`,
        metadata: { orderId },
      }),
    })

    const data = await response.json()

    if (!data.status) {
      console.error('Paystack init error:', data)
      return res.status(500).json({ error: data.message || 'Failed to initialize payment' })
    }

    // Save the Paystack reference on the order now, so the webhook can find it later
    await client.patch(orderId).set({ paystackReference: data.data.reference }).commit()

    return res.status(200).json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    })
  } catch (err) {
    console.error('paystack-init error:', err)
    return res.status(500).json({ error: 'Failed to initialize payment' })
  }
}