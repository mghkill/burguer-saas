import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import AdminHeader from '../components/AdminHeader';
import ProductForm from '../components/admin/ProductForm';
import CategoryForm from '../components/admin/CategoryForm';
import ProductList from '../components/admin/ProductList';
import CategoryList from '../components/admin/CategoryList';
import PromotionForm from '../components/admin/PromotionForm';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'promotions'>('products');
  const { isAuthenticated, logout } = useAuth();
  const { products, categories, addProduct, deleteProduct, addCategory, deleteCategory, setFeaturedProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onLogout={logout} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Painel Administrativo</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'products' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('products')}
            >
              Produtos
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'categories' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('categories')}
            >
              Categorias
            </button>
            <button
              className={`px-4 py-3 font-medium ${activeTab === 'promotions' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('promotions')}
            >
              Destaques e Promoções
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'products' && (
              <div className="space-y-8">
                <ProductForm categories={categories} onSubmit={addProduct} />
                <ProductList products={products} categories={categories} onDelete={deleteProduct} />
              </div>
            )}
            
            {activeTab === 'categories' && (
              <div className="space-y-8">
                <CategoryForm onSubmit={addCategory} />
                <CategoryList categories={categories} onDelete={deleteCategory} />
              </div>
            )}
            
            {activeTab === 'promotions' && (
              <div className="space-y-8">
                <PromotionForm 
                  products={products} 
                  onSetFeatured={setFeaturedProduct} 
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;