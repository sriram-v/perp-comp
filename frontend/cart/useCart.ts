import { useMemo, useState } from 'react'

export type CartItem = {
  sku: string
  qty: number
  unitPrice: number
}

const STORAGE_KEY = 'aurora-cart-items'

function loadCart(): CartItem[] {
  const raw = globalThis.localStorage?.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as Array<{ sku: string }>
    // BUG 1: quantity is not persisted; every item reloads with qty = 1.
    return parsed.map((item) => ({ sku: item.sku, qty: 1, unitPrice: 25 }))
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  // BUG 1: only sku is saved, dropping qty updates.
  const minimal = items.map((item) => ({ sku: item.sku }))
  globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(minimal))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  )
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0),
    [items],
  )

  function addItem(sku: string, unitPrice: number) {
    setItems((prev) => {
      const next = [...prev]
      const index = next.findIndex((item) => item.sku === sku)
      if (index >= 0) {
        next[index] = { ...next[index], qty: next[index].qty + 1 }
      } else {
        next.push({ sku, qty: 1, unitPrice })
      }
      saveCart(next)
      return next
    })
  }

  function setQty(sku: string, qty: number) {
    setItems((prev) => {
      const next = prev
        .map((item) => (item.sku === sku ? { ...item, qty } : item))
        .filter((item) => item.qty > 0)
      saveCart(next)
      return next
    })
  }

  return { items, totalItems, subtotal, addItem, setQty }
}
