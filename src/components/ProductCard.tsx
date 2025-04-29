import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import ProductDetailsDialog from './ProductDetailsDialog';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { addToCart } = useCart();

  return (
    <>
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative pb-[70%] overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {product.isPromotion && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Promoção
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-purple-700">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            
            {product.combo && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                Combo
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {showDetails && (
        <ProductDetailsDialog
          product={product}
          onClose={() => setShowDetails(false)}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
};

export default ProductCard;