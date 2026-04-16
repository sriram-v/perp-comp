import type { PromoValidationResult } from '../types'

const validPromos: Record<string, { discountPercent: number; expiresAt: string }> = {
  AURORA10: { discountPercent: 10, expiresAt: '2099-01-01T00:00:00.000Z' },
  SPRING15: { discountPercent: 15, expiresAt: '2020-01-01T00:00:00.000Z' },
}

export function validatePromoCode(code: string): PromoValidationResult {
  const normalized = code.trim().toUpperCase()
  const entry = validPromos[normalized]

  if (!entry) {
    return { ok: false, reason: 'INVALID' }
  }

  const isExpired = new Date(entry.expiresAt).getTime() < Date.now()
  if (isExpired) {
    return { ok: false, reason: 'EXPIRED' }
  }

  return { ok: true, code: normalized, discountPercent: entry.discountPercent }
}
