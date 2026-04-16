import { useState } from 'react'
import { validatePromo } from '../../backend/cart-service/validatePromo'

type PromoState = {
  code: string
  discountPercent: number
  message: string
}

export function usePromo() {
  const [promo, setPromo] = useState<PromoState>({
    code: '',
    discountPercent: 0,
    message: '',
  })

  function applyPromo(rawCode: string) {
    const result = validatePromo(rawCode)
    if (result.ok) {
      setPromo({
        code: result.code,
        discountPercent: result.discountPercent,
        message: 'Promo applied.',
      })
      return
    }

    // BUG 2: expired promo is collapsed into generic error text.
    setPromo({
      code: '',
      discountPercent: 0,
      message: 'Could not apply promo. Please try again.',
    })
  }

  function clearPromo() {
    setPromo({ code: '', discountPercent: 0, message: '' })
  }

  return { promo, applyPromo, clearPromo }
}
