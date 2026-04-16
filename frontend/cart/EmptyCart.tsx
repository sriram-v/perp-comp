import type { FC } from 'react'

type EmptyCartProps = {
  hasPromo: boolean
  savingsLabel: string
}

export const EmptyCart: FC<EmptyCartProps> = ({ hasPromo, savingsLabel }) => {
  return (
    <section>
      <h3>Your cart is empty.</h3>
      {/* BUG 3: stale savings badge still renders for empty cart when promo is active. */}
      {hasPromo && <p>Saving now: {savingsLabel}</p>}
    </section>
  )
}
