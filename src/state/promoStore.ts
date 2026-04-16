import { checkPromoCode } from '../backend/mockApi'
import type { PromoState } from '../types'

type PromoListener = (state: PromoState) => void

let state: PromoState = {
  code: '',
  discountPercent: 0,
  status: 'idle',
  error: null,
}

const listeners = new Set<PromoListener>()

function publish() {
  listeners.forEach((listener) => listener({ ...state }))
}

export function getPromoState(): PromoState {
  return { ...state }
}

export function subscribeToPromo(listener: PromoListener): () => void {
  listeners.add(listener)
  listener({ ...state })
  return () => listeners.delete(listener)
}

export async function applyPromoCode(code: string) {
  const result = await checkPromoCode(code)
  if (result.ok) {
    state = {
      code: result.code,
      discountPercent: result.discountPercent,
      status: 'applied',
      error: null,
    }
  } else {
    // Intentional bug: EXPIRED is collapsed to a generic message.
    state = {
      ...state,
      status: 'error',
      error: 'Something went wrong while applying the code.',
    }
  }
  publish()
}

export function clearPromo() {
  state = {
    code: '',
    discountPercent: 0,
    status: 'idle',
    error: null,
  }
  publish()
}
