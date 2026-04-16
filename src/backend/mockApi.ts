import { mockCatalog } from '../data/mockCatalog'
import { validatePromoCode } from './promoService'
import type { Product, PromoValidationResult } from '../types'

const latency = 120

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCatalog), latency)
  })
}

export function checkPromoCode(code: string): Promise<PromoValidationResult> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(validatePromoCode(code)), latency)
  })
}
