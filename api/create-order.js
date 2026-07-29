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

  const { cartId, customerName, phone, address, items, total } = req.body

  if (!cartId || !customerName || !phone || !address || !items?.length || !total) {
    return res.status(400).json({ error: 'Missing required order fields' })
  }

  try {
    const order = await client.create({
      _type: 'order',
      cartId,
      customerName,
      phone,
      address,
      items,
      total,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
    })

    return res.status(200).json({ orderId: order._id })
  } catch (err) {
    console.error('create-order error:', err)
    return res.status(500).json({ error: 'Failed to create order' })
  }
}