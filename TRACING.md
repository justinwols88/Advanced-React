# Tracing Configuration

This e-commerce application is instrumented with **OpenTelemetry** for distributed tracing.

## What's Traced

The application automatically traces:

### 1. **HTTP Requests** (Auto-instrumented)

- All `fetch()` calls to the FakeStore API
- XMLHttpRequest calls
- Request duration, status codes, and URLs

### 2. **Shopping Cart Operations** (Custom spans)

- `cart.addToCart` - Adding items to cart
  - Attributes: product.id, product.title, product.price, quantity, cart.totalItems, cart.totalPrice
- `cart.removeFromCart` - Removing items from cart
  - Attributes: product.id, cart.totalItems
- `cart.updateQuantity` - Updating item quantities
  - Attributes: product.id, quantity.old, quantity.new, cart.totalItems
- `cart.clearCart` - Clearing the cart
  - Attributes: items.count

## Viewing Traces

Traces are exported to **AI Toolkit's trace viewer** at:

- **HTTP Endpoint**: `http://localhost:4318/v1/traces`
- **gRPC Endpoint**: `http://localhost:4317`

### To View Traces

1. Open the AI Toolkit trace viewer in VS Code (should open automatically)
2. Run the application: `npm run dev`
3. Interact with the app (browse products, add to cart, etc.)
4. View the traces in the AI Toolkit trace viewer

## Configuration

The tracing setup is in `src/tracing.ts` and is initialized before the React app in `src/main.tsx`.

### Key Components

- **Service Name**: `ecommerce-store-frontend`
- **Exporter**: OTLP HTTP Exporter (AI Toolkit)
- **Auto-instrumentation**: Fetch and XMLHttpRequest
- **Custom Instrumentation**: Cart operations in Redux store

## Trace Propagation

The application propagates trace context to:

- `https://fakestoreapi.com/*`
- `localhost` endpoints

This ensures full end-to-end tracing across all API calls.

## Benefits

With tracing enabled, you can:

- 🔍 Monitor API performance and latency
- 🛒 Track user shopping cart interactions
- 🐛 Debug issues with detailed request/response data
- 📊 Analyze application performance bottlenecks
- 🔗 See the full request flow from user action to API response
