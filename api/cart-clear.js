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

  const { cartId } = req.body
  if (!cartId) return res.status(400).json({ error: 'Missing cartId' })

  try {
    const ids = await client.fetch(`*[_type == "cartItem" && cartId == $cartId]._id`, { cartId })
    if (ids.length > 0) {
      const tx = client.transaction()
      ids.forEach((id) => tx.delete(id))
      await tx.commit()
    }
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('cart-clear error:', err)
    return res.status(500).json({ error: 'Failed to clear cart' })
  }
}