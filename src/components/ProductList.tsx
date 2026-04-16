import { addToCart } from '../state/cartStore'
import { formatCurrencyFromCents } from '../utils/currency'
import type { Product } from '../types'

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <section>
      <h2>Products</h2>
      <ul className="card-list">
        {products.map((product) => (
          <li key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>{formatCurrencyFromCents(product.priceCents)}</p>
            <button onClick={() => addToCart(product.id)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
