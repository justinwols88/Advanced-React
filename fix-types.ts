import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update files
function updateFile(filePath: string, updates: Array<{
  search: string | RegExp;
  replace: string;
}>) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    updates.forEach(({ search, replace }) => {
      const newContent = content.replace(search, replace);
      if (newContent !== content) {
        content = newContent;
        updated = true;
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Update CartItem.tsx
const cartItemPath = path.join(__dirname, 'src/components/cart/CartItem.tsx');
if (fs.existsSync(cartItemPath)) {
  updateFile(cartItemPath, [
    {
      search: /import \{ CartItem \} from ['"]@\/types\/product\.types['"];/,
      replace: 'import type { CartItem } from \'@/types/product.types\';'
    },
    {
      search: /item\.rating\.rate/g,
      replace: 'item.rating?.rate || 0'
    },
    {
      search: /item\.rating\.count/g,
      replace: 'item.rating?.count || 0'
    }
  ]);
} else {
  console.log(`File not found: ${cartItemPath}`);
}

// Update cartSlice.ts
const cartSlicePath = path.join(__dirname, 'src/store/cartSlice.ts');
if (fs.existsSync(cartSlicePath)) {
  const cartSliceContent = fs.readFileSync(cartSlicePath, 'utf8');
  
  if (!cartSliceContent.includes('import type { Product }')) {
    const newContent = cartSliceContent.replace(
      /import type \{\s*PayloadAction\s*\} from ['"]@reduxjs\/toolkit['"];/,
      `import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product.types';`
    );
    fs.writeFileSync(cartSlicePath, newContent);
    console.log(`Fixed ${cartSlicePath}`);
  }
} else {
  console.log(`File not found: ${cartSlicePath}`);
}

console.log('Type fixes completed!');