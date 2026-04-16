type PromoValidationSuccess = {
  ok: true
  code: string
  discountPercent: number
}

type PromoValidationFailure = {
  ok: false
  reason: 'INVALID' | 'EXPIRED'
}

type PromoValidationResult = PromoValidationSuccess | PromoValidationFailure

const promoTable: Record<string, { discountPercent: number; expiresAt: string }> = {
  AURORA10: { discountPercent: 10, expiresAt: '2099-01-01T00:00:00.000Z' },
  SPRING15: { discountPercent: 15, expiresAt: '2020-01-01T00:00:00.000Z' },
}

export function validatePromo(input: string): PromoValidationResult {
  const code = input.trim().toUpperCase()
  const found = promoTable[code]

  if (!found) {
    return { ok: false, reason: 'INVALID' }
  }

  const isExpired = Date.now() > new Date(found.expiresAt).getTime()
  if (isExpired) {
    return { ok: false, reason: 'EXPIRED' }
  }

  return { ok: true, code, discountPercent: found.discountPercent }
}
