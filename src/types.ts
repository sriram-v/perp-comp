export interface Product {
  id: string
  name: string
  priceCents: number
}

export interface CartItem {
  productId: string
  quantity: number
}

export type PromoStatus = 'idle' | 'applied' | 'error'

export interface PromoState {
  code: string
  discountPercent: number
  status: PromoStatus
  error: string | null
}

export type PromoValidationResult =
  | { ok: true; code: string; discountPercent: number }
  | { ok: false; reason: 'INVALID' | 'EXPIRED' }
