import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { applyPromoCode, clearPromo, subscribeToPromo } from '../state/promoStore'
import type { PromoState } from '../types'

export function PromoCodeForm() {
  const [codeInput, setCodeInput] = useState('')
  const [promo, setPromo] = useState<PromoState>({
    code: '',
    discountPercent: 0,
    status: 'idle',
    error: null,
  })

  useEffect(() => subscribeToPromo(setPromo), [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await applyPromoCode(codeInput)
  }

  return (
    <section className="box">
      <h2>Promo</h2>
      <form onSubmit={onSubmit} className="row">
        <input
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
          placeholder="Try AURORA10 or SPRING15"
        />
        <button type="submit">Apply</button>
      </form>
      {promo.status === 'applied' && (
        <p className="ok">
          Applied {promo.code} for {promo.discountPercent}% off.
        </p>
      )}
      {promo.status === 'error' && <p className="error">{promo.error}</p>}
      <button onClick={clearPromo} className="link-button">
        Clear promo
      </button>
    </section>
  )
}
