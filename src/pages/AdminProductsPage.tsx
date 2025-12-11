import React, { useState } from 'react';
import { useFirestoreProducts } from '@/hooks/useFirestoreProducts';
import { 
  deleteFirestoreProduct, 
  updateFirestoreProduct 
} from '@/services/firestoreProducts';
import { seedProductsFromAPI } from '@/utils/seedFirestore';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { 
  Database, 
  Trash2, 
  Edit, 
  Download, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

const AdminProductsPage: React.FC = () => {
  const { products, loading, error } = useFirestoreProducts();
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeedProducts = async () => {
    setSeeding(true);
    setSeedResult(null);

    try {
      const result = await seedProductsFromAPI();
      
      if (result.success) {
        setSeedResult({
          success: true,
          message: `Successfully seeded ${result.count} products to Firestore!`
        });
        // Refresh the page to show new products
        window.location.reload();
      } else {
        setSeedResult({
          success: false,
          message: 'Failed to seed products. Check console for details.'
        });
      }
    } catch (error) {
      setSeedResult({
        success: false,
        message: 'An error occurred while seeding products.'
      });
    } finally {
      setSeeding(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteFirestoreProduct(id);
      alert('Product deleted successfully!');
      window.location.reload();
    } catch (error) {
      alert('Failed to delete product');
      console.error(error);
    }
  };

  const handleToggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      await updateFirestoreProduct(id, { featured: !currentFeatured } as any);
      alert('Product updated successfully!');
      window.location.reload();
    } catch (error) {
      alert('Failed to update product');
      console.error(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Database className="w-8 h-8 text-primary-600" />
          Firestore Product Management
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Actions</h2>
          
          {seedResult && (
            <div className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
              seedResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {seedResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p className={seedResult.success ? 'text-green-700' : 'text-red-700'}>
                {seedResult.message}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              variant="primary"
              leftIcon={<Download />}
              onClick={handleSeedProducts}
              disabled={seeding}
            >
              {seeding ? 'Seeding Products...' : 'Seed Products from API'}
            </Button>
            
            <div className="text-sm text-gray-600 flex items-center">
              <span>Current products in Firestore: <strong>{products.length}</strong></span>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Click "Seed Products" to import all products from FakeStore API into your Firestore database.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {products.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">No products in Firestore yet</p>
          <Button variant="primary" leftIcon={<Download />} onClick={handleSeedProducts}>
            Seed Products Now
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-12 h-12 object-contain rounded"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ⭐ {product.rating.rate} ({product.rating.count})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
