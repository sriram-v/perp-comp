export type LineItem = {
  sku: string
  qty: number
  unitPrice: number
}

export type CartSnapshot = {
  items: LineItem[]
  subtotal: number
  savings: number
  total: number
}

export function updateCart(
  current: CartSnapshot,
  update: { sku: string; qty: number },
): CartSnapshot {
  const nextItems = current.items
    .map((item) => (item.sku === update.sku ? { ...item, qty: update.qty } : item))
    .filter((item) => item.qty > 0)

  const subtotal = nextItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const savings = current.savings
  const total = subtotal - savings

  return {
    items: nextItems,
    subtotal,
    savings,
    total,
  }
}
