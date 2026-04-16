import type { FC } from 'react'

type PromoBannerProps = {
  discountPercent: number
  message: string
}

export const PromoBanner: FC<PromoBannerProps> = ({ discountPercent, message }) => {
  if (!discountPercent && !message) {
    return null
  }

  return (
    <section>
      <strong>Promo</strong>
      <p>{message}</p>
      {discountPercent > 0 && <p>{discountPercent}% savings applied.</p>}
    </section>
  )
}
