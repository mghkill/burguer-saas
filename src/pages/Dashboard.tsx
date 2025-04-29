import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductSection from '../components/ProductSection';
import CategorySelector from '../components/CategorySelector';
import SearchBar from '../components/SearchBar';
import { useProducts } from '../context/ProductContext';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import Cart from '../components/Cart';

const Dashboard: React.FC = () => {
  const { products, categories, featuredProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const groupedProducts = selectedCategory
    ? { [selectedCategory]: filteredProducts }
    : filteredProducts.reduce((acc, product) => {
        const categoryId = product.categoryId;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(product);
        return acc;
      }, {} as Record<string, typeof products>);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategorySelector 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {!selectedCategory && !searchTerm && (
            <FeaturedProducts products={featuredProducts} />
          )}

          {Object.entries(groupedProducts).map(([categoryId, products]) => {
            const category = categories.find(c => c.id === categoryId);
            return products.length > 0 ? (
              <ProductSection 
                key={categoryId} 
                title={category?.name || "Produtos"} 
                products={products} 
              />
            ) : null;
          })}

          {Object.keys(groupedProducts).length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600">Nenhum produto encontrado</h3>
              <p className="text-gray-500 mt-2">Tente uma busca diferente ou selecione outra categoria</p>
            </div>
          )}
        </main>
        
        <Cart />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Dashboard;