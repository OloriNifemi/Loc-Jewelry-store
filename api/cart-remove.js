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

  const { itemId } = req.body
  if (!itemId) return res.status(400).json({ error: 'Missing itemId' })

  try {
    await client.delete(itemId)
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('cart-remove error:', err)
    return res.status(500).json({ error: 'Failed to remove item' })
  }
}