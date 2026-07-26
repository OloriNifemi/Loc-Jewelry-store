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

  const { cartId, productKey, productName, category, price, image } = req.body

  if (!cartId || !productKey) {
    return res.status(400).json({ error: 'Missing cartId or productKey' })
  }

  try {
    const existing = await client.fetch(
      `*[_type == "cartItem" && cartId == $cartId && productKey == $productKey][0]`,
      { cartId, productKey }
    )

    let result
    if (existing) {
      result = await client
        .patch(existing._id)
        .inc({ quantity: 1 })
        .commit()
    } else {
      result = await client.create({
        _type: 'cartItem',
        cartId,
        productKey,
        productName,
        category,
        price,
        image,
        quantity: 1,
        createdAt: new Date().toISOString(),
      })
    }

    return res.status(200).json(result)
  } catch (err) {
    console.error('cart-add error:', err)
    return res.status(500).json({ error: 'Failed to add to cart' })
  }
}