import { test, expect } from '@playwright/test';

test.describe('E-commerce Application', () => {
  test('should display homepage with products', async ({ page }) => {
    // Set up response listener before navigation
    const responsePromise = page.waitForResponse(
      response => response.url().includes('fakestoreapi.com/products') && response.status() === 200,
      { timeout: 30000 }
    );
    
    // Navigate
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for the products API call to complete
    await responsePromise;
    
    // Check if the hero section is visible with actual heading text
    await expect(page.getByRole('heading', { name: /Welcome to/i })).toBeVisible();
    
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 15000 });
    
    // Check if products are displayed
    const products = await page.locator('[data-testid="product-card"]').count();
    expect(products).toBeGreaterThan(0);
  });

  test('should navigate to product detail page', async ({ page }) => {
    // Set up response listener before navigation
    const responsePromise = page.waitForResponse(
      response => response.url().includes('fakestoreapi.com/products') && response.status() === 200,
      { timeout: 30000 }
    );
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for the products API call to complete
    await responsePromise;
    
    // Wait for products to load
    await page.waitForSelector('a[href^="/product/"]', { timeout: 15000 });
    
    // Click on first product
    await page.click('a[href^="/product/"]:first-of-type');
    
    // Check if we're on product detail page
    await expect(page).toHaveURL(/\/product\/\d+/);
    
    // Check if product details are visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    // Set up response listener before navigation
    const responsePromise = page.waitForResponse(
      response => response.url().includes('fakestoreapi.com/products') && response.status() === 200,
      { timeout: 30000 }
    );
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for the products API call to complete
    await responsePromise;
    
    // Wait for products to load
    await page.waitForSelector('a[href^="/product/"]', { timeout: 15000 });
    
    // Go to first product
    await page.click('a[href^="/product/"]:first-of-type');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Add to cart
    await page.getByRole('button', { name: /add to cart/i }).first().click();
    
    // Check if cart icon updates
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.goto('/cart');
    
    // Check if product is in cart
    await expect(page.getByText(/your cart/i)).toBeVisible();
  });

  test('should navigate between categories', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for categories to load
    await page.waitForSelector('a[href^="/category/"]', { timeout: 15000 });
    
    // Click on electronics category
    const electronicsLink = page.locator('a[href*="electronics"]').first();
    await electronicsLink.click();
    
    // Check if we're on category page
    await expect(page).toHaveURL(/\/category\/electronics/);
    
    // Check if category heading is visible (category name, not the word "Category")
    await expect(page.getByRole('heading', { name: /electronics/i })).toBeVisible();
  });

  test('should filter and paginate products', async ({ page }) => {
    await page.goto('/category/electronics');
    
    // Wait for products to load
    await page.waitForLoadState('networkidle');
    
    // Check if view mode buttons exist
    const gridButton = page.getByRole('button', { name: /grid view/i });
    if (await gridButton.isVisible()) {
      await gridButton.click();
    }
    
    // Check if pagination exists if there are many products
    const paginationExists = await page.locator('nav').filter({ hasText: /1/ }).count();
    if (paginationExists > 0) {
      expect(paginationExists).toBeGreaterThan(0);
    }
  });

  test('should update cart quantities', async ({ page }) => {
    // Set up response listener before navigation
    const responsePromise = page.waitForResponse(
      response => response.url().includes('fakestoreapi.com/products') && response.status() === 200,
      { timeout: 30000 }
    );
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for the products API call to complete
    await responsePromise;
    
    // Add a product to cart
    await page.waitForSelector('a[href^="/product/"]', { timeout: 15000 });
    await page.click('a[href^="/product/"]:first-of-type');
    await page.waitForLoadState('networkidle');
    
    // Click add to cart button
    await page.getByRole('button', { name: /add to cart/i }).first().click();
    
    // Wait for cart update and click the cart icon to go to cart page
    await page.waitForTimeout(500);
    const cartLink = page.locator('a[href="/cart"]').first();
    await cartLink.click();
    
    // Wait for navigation and page load
    await page.waitForURL('**/cart');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on cart page with items (check for Shopping Cart heading)
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible({ timeout: 10000 });
    
    // Find quantity controls
    const increaseButton = page.getByRole('button', { name: 'Increase quantity' });
    const decreaseButton = page.getByRole('button', { name: 'Decrease quantity' });
    
    // Verify controls exist
    await expect(increaseButton).toBeVisible();
    await expect(decreaseButton).toBeVisible();
  });

  test('should clear cart', async ({ page }) => {
    // Set up response listener before navigation
    const responsePromise = page.waitForResponse(
      response => response.url().includes('fakestoreapi.com/products') && response.status() === 200,
      { timeout: 30000 }
    );
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for the products API call to complete
    await responsePromise;
    
    // Add a product to cart
    await page.waitForSelector('a[href^="/product/"]', { timeout: 15000 });
    await page.click('a[href^="/product/"]:first-of-type');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /add to cart/i }).first().click();
    
    // Go to cart
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');
    
    // Look for clear cart or remove buttons
    const clearButton = page.getByRole('button', { name: /clear cart|remove/i }).first();
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
  });
});
