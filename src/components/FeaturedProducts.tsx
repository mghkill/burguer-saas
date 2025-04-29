import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-12 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Destaques</h2>
      
      <div className="relative overflow-hidden rounded-lg h-64 md:h-80">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              x: `${(index - currentIndex) * 100}%`
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex"
          >
            <div className="w-full h-full relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-white text-opacity-90 mb-3">{product.description}</p>
                <p className="text-white font-bold text-xl">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {products.length > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
      
      <div className="flex justify-center mt-4 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;