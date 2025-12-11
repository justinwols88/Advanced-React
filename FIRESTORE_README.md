# Firebase Firestore Integration

This project now includes Firebase Firestore for data persistence and management.

## Features Added

### 1. **Firestore Product Management** (`src/services/firestoreProducts.ts`)

Complete CRUD operations for products:

- ✅ `getFirestoreProducts()` - Fetch all products or by category
- ✅ `getFirestoreProduct(id)` - Get single product by ID
- ✅ `addFirestoreProduct()` - Add new product
- ✅ `updateFirestoreProduct()` - Update existing product
- ✅ `deleteFirestoreProduct()` - Delete product
- ✅ `getFirestoreProductsByCategory()` - Filter products by category
- ✅ `getFeaturedProducts()` - Get featured products
- ✅ `searchFirestoreProducts()` - Search products by title
- ✅ `seedFirestoreProducts()` - Seed database from external API

### 2. **Custom React Hooks** (`src/hooks/useFirestoreProducts.ts`)

- `useFirestoreProducts(category?)` - Fetch products with loading/error states
- `useFirestoreProduct(id)` - Fetch single product
- `useSearchFirestoreProducts()` - Search with debouncing
- `useFirestoreProductsByCategory()` - Category-filtered products

### 3. **Admin Dashboard** (`src/pages/AdminProductsPage.tsx`)

Protected admin page at `/admin/products` with:

- 📊 View all products in Firestore
- ⬇️ Seed products from FakeStore API
- 🗑️ Delete products
- 📝 Product management interface
- 📈 Product count and statistics

### 4. **Utilities** (`src/utils/seedFirestore.ts`)

- `seedProductsFromAPI()` - Import products from FakeStore API
- `checkFirestoreProducts()` - Check if database has products

## Firestore Collections

### Products Collection

``` postman
products/
  {productId}/
    - title: string
    - price: number
    - description: string
    - category: string
    - image: string
    - rating: { rate: number, count: number }
    - createdAt: Timestamp
    - updatedAt: Timestamp
    - stock: number (default: 100)
    - featured: boolean (default: false)
```

### Existing Collections

- `users/` - User profiles
- `carts/` - Shopping carts
- `wishlists/` - User wishlists
- `orders/` - Order history

## Getting Started

### 1. Seed Products to Firestore

Visit `/admin/products` and click "Seed Products from API" to import all products from FakeStore API into your Firestore database.

### 2. Switch to Firestore Data (Optional)

To use Firestore instead of FakeStore API, update your components to use the Firestore hooks:

```typescript
// Before (using API)
import { useProducts } from '@/hooks/useProducts';

// After (using Firestore)
import { useFirestoreProducts } from '@/hooks/useFirestoreProducts';

// In component
const { products, loading, error } = useFirestoreProducts();
```

### 3. Admin Access

- Navigate to `/admin/products` to manage your Firestore products
- Requires authentication (protected route)

## API Comparison

| Operation | FakeStore API | Firestore |
|-----------|---------------|-----------|
| Fetch Products | `api.getProducts()` | `getFirestoreProducts()` |
| Fetch by Category | `api.getProducts(category)` | `getFirestoreProductsByCategory()` |
| Single Product | `api.getProduct(id)` | `getFirestoreProduct(id)` |
| Search | ❌ Not available | ✅ `searchFirestoreProducts()` |
| Add Product | ❌ Read-only | ✅ `addFirestoreProduct()` |
| Update Product | ❌ Read-only | ✅ `updateFirestoreProduct()` |
| Delete Product | ❌ Read-only | ✅ `deleteFirestoreProduct()` |

## Benefits of Firestore

1. **Real-time Updates** - Changes sync instantly
2. **Offline Support** - Works offline with local cache
3. **Full CRUD** - Add, edit, delete products
4. **Custom Fields** - Add stock, featured flags, etc.
5. **Scalability** - Scales automatically with usage
6. **Security** - Firebase Security Rules protection

## Migration Path

You can gradually migrate from FakeStore API to Firestore:

1. ✅ Keep using FakeStore API (default)
2. ✅ Seed Firestore with products
3. ✅ Test Firestore with admin panel
4. ✅ Switch components to Firestore hooks when ready

Both systems work side-by-side!

## Security Rules (Recommended)

Add these to Firebase Console → Firestore Database → Rules:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - read for all, write for authenticated users
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Other collections...
  }
}
\`\`\`

## Next Steps

- [ ] Add product image upload to Firebase Storage
- [ ] Implement real-time product updates
- [ ] Add inventory tracking
- [ ] Create product categories collection
- [ ] Add product reviews and ratings
