import { useEffect, useMemo, useState } from 'react'
import {
  getCartItems,
  removeFromCart,
  setQuantity,
  subscribeToCart,
} from '../state/cartStore'
import { subscribeToPromo } from '../state/promoStore'
import { formatCurrencyFromCents } from '../utils/currency'
import type { CartItem, Product, PromoState } from '../types'

interface CartPanelProps {
  products: Product[]
}

export function CartPanel({ products }: CartPanelProps) {
  const [items, setItems] = useState<CartItem[]>(getCartItems())
  const [promo, setPromo] = useState<PromoState>({
    code: '',
    discountPercent: 0,
    status: 'idle',
    error: null,
  })

  useEffect(() => subscribeToCart(setItems), [])
  useEffect(() => subscribeToPromo(setPromo), [])

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId)
          if (!product) {
            return null
          }
          return { ...item, product }
        })
        .filter(Boolean) as Array<CartItem & { product: Product }>,
    [items, products],
  )

  const subtotalCents = detailedItems.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  )
  const savingsCents = Math.round((subtotalCents * promo.discountPercent) / 100)
  const totalCents = subtotalCents - savingsCents

  return (
    <section className="box">
      <h2>Cart</h2>
      {detailedItems.length === 0 && <p>Your cart is empty.</p>}
      {detailedItems.map((item) => (
        <div key={item.productId} className="cart-row">
          <div>
            <strong>{item.product.name}</strong>
            <p>{formatCurrencyFromCents(item.product.priceCents)}</p>
          </div>
          <div className="row">
            <button
              onClick={() => setQuantity(item.productId, item.quantity - 1)}
              aria-label={`Decrease ${item.product.name}`}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => setQuantity(item.productId, item.quantity + 1)}
              aria-label={`Increase ${item.product.name}`}
            >
              +
            </button>
            <button onClick={() => removeFromCart(item.productId)}>Remove</button>
          </div>
        </div>
      ))}
      <hr />
      <p>Subtotal: {formatCurrencyFromCents(subtotalCents)}</p>
      <p>Savings: {formatCurrencyFromCents(savingsCents)}</p>
      <p>
        <strong>Total: {formatCurrencyFromCents(totalCents)}</strong>
      </p>
    </section>
  )
}
