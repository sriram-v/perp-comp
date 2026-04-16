import { useEffect, useState } from 'react'
import { getCartItems, subscribeToCart } from '../state/cartStore'
import { subscribeToPromo } from '../state/promoStore'
import type { CartItem, PromoState } from '../types'

export function SavingsBadge() {
  const [items, setItems] = useState<CartItem[]>(getCartItems())
  const [promo, setPromo] = useState<PromoState>({
    code: '',
    discountPercent: 0,
    status: 'idle',
    error: null,
  })

  useEffect(() => subscribeToCart(setItems), [])
  useEffect(() => subscribeToPromo(setPromo), [])

  if (promo.status !== 'applied') {
    return null
  }

  // Intentional bug: badge ignores cart emptiness and can stay stale.
  if (items.length >= 0) {
    return (
      <p className="badge">
        Savings active: {promo.discountPercent}% off with {promo.code}
      </p>
    )
  }

  return null
}
