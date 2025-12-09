# Testing Guide

This project uses a comprehensive testing setup with **Vitest** for unit/component tests and **Playwright** for end-to-end tests.

## Testing Stack

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **Playwright** - E2E browser testing
- **@testing-library/jest-dom** - Custom matchers

## Running Tests

### Unit & Component Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# View E2E test report
npm run test:e2e:report
```

## Test Structure

### Unit Tests

Located alongside source files with `.test.tsx` extension:

- `src/components/**/*.test.tsx` - Component tests
- `src/hooks/**/*.test.tsx` - Hook tests
- `src/services/**/*.test.ts` - Service tests

### E2E Test Files

Located in `e2e/` directory:

- `e2e/app.spec.ts` - Main application flows

## Writing Tests

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Hook Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@/test/utils';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  const TestComponent = () => {
    const { value } = useMyHook();
    return <div>{value}</div>;
  };

  it('returns correct value', () => {
    render(<TestComponent />);
    // assertions...
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('user can add product to cart', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Add to Cart');
  await expect(page.locator('.cart-count')).toContainText('1');
});
```

## Test Coverage

Current test coverage includes:

### Components

- ✅ ProductCard - Product display and interactions
- ✅ Pagination - Page navigation
- 🔄 Add more component tests as needed

### Hooks

- ✅ useCart - Cart state management
- 🔄 Add useProducts tests

### E2E Scenarios

- ✅ Homepage product display
- ✅ Product detail navigation
- ✅ Add to cart flow
- ✅ Category filtering
- ✅ Cart management
- ✅ Pagination

## Best Practices

1. **Test user behavior, not implementation**

   - Use `screen.getByRole()` and `screen.getByText()`
   - Avoid testing internal state

2. **Keep tests isolated**

   - Each test should be independent
   - Use proper cleanup

3. **Mock external dependencies**

   - Mock API calls
   - Mock localStorage/sessionStorage

4. **Write descriptive test names**

   ```typescript
   it('should display error when product fails to load')
   ```

5. **Use test IDs sparingly**

   - Prefer semantic queries
   - Use data-testid only when necessary

## Continuous Integration

Tests run automatically on:

- Every commit (unit tests)
- Pull requests (full test suite)
- Pre-deployment (E2E tests)

## Debugging Tests

### Vitest UI

```bash
npm run test:ui
```

Opens interactive UI to debug tests.

### Playwright Debug

```bash
npx playwright test --debug
```

Opens browser with inspector.

### View Test Traces

```bash
npm run test:e2e:report
```

View detailed trace of E2E test execution.

## Adding New Tests

1. Create test file next to source file
2. Import testing utilities from `@/test/utils`
3. Write descriptive test cases
4. Run tests to verify
5. Check coverage report

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

Run `npm run test:coverage` to see current coverage.
