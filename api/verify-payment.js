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

  const { reference } = req.query
  if (!reference) return res.status(400).json({ error: 'Missing reference' })

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    })
    const data = await response.json()

    if (!data.status || !data.data) {
      return res.status(400).json({ error: 'Could not verify transaction' })
    }

    const paid = data.data.status === 'success'
    const orderId = data.data.metadata?.orderId

    if (orderId) {
      const order = await client.fetch(`*[_id == $orderId][0]`, { orderId })

      // If the webhook hasn't already updated it, do it now as a fallback
      if (order && order.status === 'pending_payment') {
        await client.patch(orderId).set({ status: paid ? 'paid' : 'failed' }).commit()
      }

      return res.status(200).json({
        paid,
        order: {
          id: orderId,
          customerName: order?.customerName,
          total: order?.total,
          items: order?.items,
        },
      })
    }

    return res.status(200).json({ paid, order: null })
  } catch (err) {
    console.error('verify-payment error:', err)
    return res.status(500).json({ error: 'Verification failed' })
  }
}