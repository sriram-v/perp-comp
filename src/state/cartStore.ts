import type { CartItem } from '../types'

const STORAGE_KEY = 'aurora-cart-items'
type CartListener = (items: CartItem[]) => void

let items: CartItem[] = loadItems()
const listeners = new Set<CartListener>()

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw) as Array<{ productId: string }>
    return parsed.map((item) => ({ productId: item.productId, quantity: 1 }))
  } catch {
    return []
  }
}

function persist() {
  // Intentional bug: quantity is dropped, so values reset on refresh.
  const snapshot = items.map((item) => ({ productId: item.productId }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
}

function publish() {
  listeners.forEach((listener) => listener([...items]))
}

export function getCartItems(): CartItem[] {
  return [...items]
}

export function subscribeToCart(listener: CartListener): () => void {
  listeners.add(listener)
  listener([...items])
  return () => listeners.delete(listener)
}

export function addToCart(productId: string) {
  const index = items.findIndex((item) => item.productId === productId)
  if (index >= 0) {
    items = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, quantity: item.quantity + 1 } : item,
    )
  } else {
    items = [...items, { productId, quantity: 1 }]
  }
  persist()
  publish()
}

export function setQuantity(productId: string, quantity: number) {
  const safeQuantity = Math.max(0, Math.floor(quantity))
  if (safeQuantity === 0) {
    removeFromCart(productId)
    return
  }
  items = items.map((item) =>
    item.productId === productId ? { ...item, quantity: safeQuantity } : item,
  )
  persist()
  publish()
}

export function removeFromCart(productId: string) {
  items = items.filter((item) => item.productId !== productId)
  persist()
  publish()
}
