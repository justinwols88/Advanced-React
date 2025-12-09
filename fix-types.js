"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Run this script to fix all type mismatches
var fs_1 = require("fs");
var path_1 = require("path");
var projectRoot = process.cwd();
// Update product.types.ts
var productTypesPath = path_1.default.join(projectRoot, 'src', 'types', 'product.types.ts');
var productTypesContent = "export interface Product {\n  id: number;\n  title: string;\n  price: number;\n  description: string;\n  category: string;\n  image: string;\n  rating: {\n    rate: number;\n    count: number;\n  };\n}\n\nexport interface CartItem {\n  id: number;\n  title: string;\n  price: number;\n  image: string;\n  quantity: number;\n  category?: string;\n  description?: string;\n  rating?: {\n    rate: number;\n    count: number;\n  };\n}\n";
fs_1.default.writeFileSync(productTypesPath, productTypesContent, 'utf8');
console.log('Updated product.types.ts');
// Fix any file with CartItemType imports
var fixFile = function (filePath) {
    try {
        var content = fs_1.default.readFileSync(filePath, 'utf8');
        // Replace CartItemType with CartItem
        content = content.replace(/CartItemType/g, 'CartItem');
        // Fix imports
        content = content.replace(/import.*CartItem.*from.*product\.types.*/g, "import { CartItem } from '@/types/product.types';");
        fs_1.default.writeFileSync(filePath, content, 'utf8');
        console.log("Fixed ".concat(filePath));
    }
    catch (error) {
        console.log("Could not read ".concat(filePath));
    }
};
// Find and fix all TypeScript files
var findAllTsFiles = function (dir) {
    var results = [];
    var list = fs_1.default.readdirSync(dir);
    list.forEach(function (file) {
        var fullPath = path_1.default.join(dir, file);
        var stat = fs_1.default.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findAllTsFiles(fullPath));
        }
        else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(fullPath);
        }
    });
    return results;
};
var tsFiles = findAllTsFiles(path_1.default.join(projectRoot, 'src'));
tsFiles.forEach(fixFile);
console.log('Type fixes completed!');
