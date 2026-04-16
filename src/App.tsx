import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from './backend/mockApi'
import { CartPanel } from './components/CartPanel'
import { ProductList } from './components/ProductList'
import { PromoCodeForm } from './components/PromoCodeForm'
import { SavingsBadge } from './components/SavingsBadge'
import type { Product } from './types'
import './styles.css'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts().then((result) => {
      setProducts(result)
      setLoading(false)
    })
  }, [])

  const hasProducts = useMemo(() => products.length > 0, [products])

  return (
    <main className="page">
      <header>
        <h1>Aurora Cart Cleanup Mock</h1>
        <p>Intentional bug demo for triage and review workflows.</p>
      </header>
      {loading && <p>Loading products...</p>}
      {!loading && hasProducts && (
        <section className="layout">
          <ProductList products={products} />
          <aside className="sidebar">
            <PromoCodeForm />
            <SavingsBadge />
            <CartPanel products={products} />
          </aside>
        </section>
      )}
    </main>
  )
}

export default App
