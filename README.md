# aurora-cart-cleanup-mock

Tiny mock ecommerce repository for agentic bug triage and code review exercises.

This project is intentionally small:

- React + TypeScript frontend modules
- TypeScript backend service functions
- Fake in-memory data only
- No database, no auth, no external services

## File Layout

- `frontend/cart/CartPage.tsx`
- `frontend/cart/useCart.ts`
- `frontend/cart/EmptyCart.tsx`
- `frontend/promotions/PromoBanner.tsx`
- `frontend/promotions/usePromo.ts`
- `backend/cart-service/updateCart.ts`
- `backend/cart-service/validatePromo.ts`

## Intentional Bugs

1. **BUG 1** - Cart quantity does not persist after refresh  
   Location: `frontend/cart/useCart.ts`

2. **BUG 2** - Expired promo code shows generic error instead of clear message  
   Location: `frontend/promotions/usePromo.ts`

3. **BUG 3** - Empty cart shows stale savings badge  
   Location: `frontend/cart/EmptyCart.tsx`

Each bug is marked directly in code with comments: `BUG 1`, `BUG 2`, `BUG 3`.

## Next Command

```bash
npm run typecheck
```
