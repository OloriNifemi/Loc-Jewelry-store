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
    const item = await client.fetch(`*[_id == $itemId][0]{ quantity }`, { itemId })

    if (!item) {
      return res.status(200).json({ success: true, deleted: true, note: 'Item already gone' })
    }

    if (item.quantity <= 1) {
      await client.delete(itemId)
      return res.status(200).json({ success: true, deleted: true })
    }

    const result = await client.patch(itemId).dec({ quantity: 1 }).commit()
    return res.status(200).json({ success: true, deleted: false, item: result })
  } catch (err) {
    console.error('cart-decrement error:', err)
    if (err?.statusCode === 404 || /not found/i.test(err?.message ?? '')) {
      return res.status(200).json({ success: true, deleted: true, note: 'Item already gone' })
    }
    return res.status(500).json({ error: 'Failed to decrement item' })
  }
}