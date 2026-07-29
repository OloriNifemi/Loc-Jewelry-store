import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  let cartId = req.cookies?.loc_cart_id

  if (!cartId) {
    // Reuse an existing localStorage id if the client still has one (migration path),
    // otherwise mint a fresh one.
    const { legacyId } = req.query
    cartId = legacyId || crypto.randomUUID()

    res.setHeader(
      'Set-Cookie',
      `loc_cart_id=${cartId}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax; Secure`
    )
  }

  return res.status(200).json({ cartId })
}