import React from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const dispatch = useDispatch();

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      description: '',
      category: item.category,
      rating: { rate: 0, count: 0 },
      quantity: 1,
    }));
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500" />
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Your wishlist is empty</p>
          <p className="text-gray-500 mt-2">Save items you love to buy them later!</p>
          <Link to="/">
            <Button variant="primary" className="mt-6">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/product/${item.id}`}>
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-3 capitalize">{item.category}</p>
                <p className="text-xl font-bold text-primary-600 mb-4">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    className="flex-1"
                    leftIcon={<ShoppingCart className="w-4 h-4" />}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="px-3"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
