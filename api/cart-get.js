import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { cartId } = req.query
  if (!cartId) return res.status(400).json({ error: 'Missing cartId' })

  try {
    const items = await client.fetch(
      `*[_type == "cartItem" && cartId == $cartId] | order(createdAt asc)`,
      { cartId }
    )
    return res.status(200).json(items)
  } catch (err) {
    console.error('cart-get error:', err)
    return res.status(500).json({ error: 'Failed to fetch cart' })
  }
}