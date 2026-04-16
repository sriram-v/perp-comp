import { useState } from 'react'
import { EmptyCart } from './EmptyCart'
import { useCart } from './useCart'
import { PromoBanner } from '../promotions/PromoBanner'
import { usePromo } from '../promotions/usePromo'

const catalog = [
  { sku: 'aurora-mug', name: 'Aurora Mug', unitPrice: 25 },
  { sku: 'debug-cap', name: 'Debug Cap', unitPrice: 18 },
]

export function CartPage() {
  const { items, totalItems, subtotal, addItem, setQty } = useCart()
  const { promo, applyPromo, clearPromo } = usePromo()
  const [promoInput, setPromoInput] = useState('')

  const savings = Math.round((subtotal * promo.discountPercent) / 100)
  const total = subtotal - savings

  return (
    <main>
      <h1>Aurora Cart Cleanup Mock</h1>

      <section>
        <h2>Products</h2>
        {catalog.map((product) => (
          <div key={product.sku}>
            <span>
              {product.name} - ${product.unitPrice}
            </span>
            <button onClick={() => addItem(product.sku, product.unitPrice)}>Add</button>
          </div>
        ))}
      </section>

      <section>
        <h2>Promo code</h2>
        <input
          value={promoInput}
          onChange={(event) => setPromoInput(event.target.value)}
          placeholder="AURORA10 or SPRING15"
        />
        <button onClick={() => applyPromo(promoInput)}>Apply promo</button>
        <button onClick={clearPromo}>Clear promo</button>
        <PromoBanner
          discountPercent={promo.discountPercent}
          message={promo.message}
        />
      </section>

      {totalItems === 0 ? (
        <EmptyCart hasPromo={promo.discountPercent > 0} savingsLabel={`$${savings}`} />
      ) : (
        <section>
          <h2>Cart items ({totalItems})</h2>
          {items.map((item) => (
            <div key={item.sku}>
              <span>
                {item.sku} qty: {item.qty}
              </span>
              <button onClick={() => setQty(item.sku, item.qty - 1)}>-</button>
              <button onClick={() => setQty(item.sku, item.qty + 1)}>+</button>
            </div>
          ))}
          <p>Subtotal: ${subtotal}</p>
          <p>Savings: ${savings}</p>
          <p>Total: ${total}</p>
        </section>
      )}
    </main>
  )
}
