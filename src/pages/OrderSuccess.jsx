import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import { useCart } from '../../context/CartContext.jsx'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')
  const { clearAllItems } = useCart()

  const [status, setStatus] = useState('checking') // 'checking' | 'paid' | 'failed' | 'error'
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (!reference) {
      setStatus('error')
      return
    }

    async function verify() {
      try {
        const res = await fetch(`/api/verify-payment?reference=${reference}`)
        const data = await res.json()

        if (!res.ok) {
          setStatus('error')
          return
        }

        setOrder(data.order)
        if (data.paid) {
          setStatus('paid')
          clearAllItems() // empty the cart now that payment is confirmed
        } else {
          setStatus('failed')
        }
      } catch (err) {
        console.error('Verification error:', err)
        setStatus('error')
      }
    }

    verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference])

  return (
    <div className="pt-32 pb-20 px-[5vw] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center">

        {status === 'checking' && (
          <p className="text-[#888] font-montserrat">Confirming your payment…</p>
        )}

        {status === 'paid' && (
          <>
            <FaCircleCheck size={48} className="text-gold mx-auto mb-6" />
            <h1 className="font-playfair text-3xl text-white mb-3">Payment Successful</h1>
            <p className="text-[#888] mb-2">
              Thank you{order?.customerName ? `, ${order.customerName}` : ''}! Your order has been confirmed.
            </p>
            {order?.total && (
              <p className="text-gold font-semibold text-lg mb-8">
                Total Paid: ₦{order.total.toLocaleString()}
              </p>
            )}
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-gold text-black rounded font-montserrat text-[0.7rem] tracking-[0.15em] uppercase font-semibold hover:opacity-90 transition-opacity no-underline"
            >
              Continue Shopping
            </Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <FaCircleXmark size={48} className="text-red-400 mx-auto mb-6" />
            <h1 className="font-playfair text-3xl text-white mb-3">Payment Failed</h1>
            <p className="text-[#888] mb-8">
              Your payment could not be confirmed. Please try again or contact us if you believe this is an error.
            </p>
            <Link
              to="/checkout"
              className="inline-block px-8 py-3 bg-gold text-black rounded font-montserrat text-[0.7rem] tracking-[0.15em] uppercase font-semibold hover:opacity-90 transition-opacity no-underline"
            >
              Try Again
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <FaCircleXmark size={48} className="text-red-400 mx-auto mb-6" />
            <h1 className="font-playfair text-3xl text-white mb-3">Something Went Wrong</h1>
            <p className="text-[#888] mb-8">
              We couldn't verify your payment. If you were charged, please contact us on WhatsApp with your details.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-gold text-black rounded font-montserrat text-[0.7rem] tracking-[0.15em] uppercase font-semibold hover:opacity-90 transition-opacity no-underline"
            >
              Return Home
            </Link>
          </>
        )}

      </div>
    </div>
  )
}