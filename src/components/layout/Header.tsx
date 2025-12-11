import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';
import { ShoppingCart, Search, Menu, X, Sparkles, User, Heart, Package, ListTodo } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Jewelry', href: '/category/jewelery' },
    { name: "Men's Clothing", href: '/category/men\'s clothing' },
    { name: "Women's Clothing", href: '/category/women\'s clothing' },
  ];

  const userNavigation = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Orders', href: '/orders', icon: Package },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
    { name: 'My Products', href: '/my-products', icon: Package },
    { name: 'Tasks', href: '/tasks', icon: ListTodo },
    { name: 'Simple Tasks', href: '/tasks-simple', icon: ListTodo },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.includes(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Tech Gear!
                </span>
                <p className="text-sm text-gray-500">Premium Shopping</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-base font-medium transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500" />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex h-10 w-10 p-0"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account Dropdown */}
            {user ? (
              <div 
                className="relative" 
                onMouseEnter={() => setUserMenuOpen(true)} 
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-10 w-10 p-0"
                  aria-label="Account menu"
                  title={user.email || 'Account'}
                >
                  <User className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500" />
                </Button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" aria-label="Account" title="Login / Register">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-10 w-10 p-0"
                  aria-label="Account"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Cart Button */}
            <Link to="/cart" aria-label="View shopping cart" title="Shopping Cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative h-10 w-10 p-0"
                aria-label={`View cart with ${totalItems} items`}
                title={`Cart (${totalItems} items)`}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-accent-500 to-accent-600 text-xs font-bold text-white shadow-lg">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-10 w-10 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              title={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 animate-slide-down">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                aria-label="Search products"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-20 z-50 border-t bg-white shadow-xl animate-slide-down md:hidden">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                    )}
                  </NavLink>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full" leftIcon={<ShoppingCart />}>
                    View Cart ({totalItems} items)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
export default Header;