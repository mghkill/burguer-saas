import React, { useState } from 'react';
import { Star, Tag } from 'lucide-react';
import { Product } from '../../types';

interface PromotionFormProps {
  products: Product[];
  onSetFeatured: (id: string, isFeatured: boolean, isPromotion: boolean) => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({ products, onSetFeatured }) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProductId) {
      onSetFeatured(selectedProductId, isFeatured, isPromotion);
      // Reset form
      setSelectedProductId('');
      setIsFeatured(false);
      setIsPromotion(false);
    }
  };

  // Filter out products that are already featured or promotions
  const availableProducts = products.filter(
    product => !(product.isFeatured || product.isPromotion)
  );

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Gerenciar Destaques e Promoções</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
              Selecione um Produto
            </label>
            <select
              id="product"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            >
              <option value="">Selecione um produto</option>
              {availableProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - R$ {product.price.toFixed(2).replace('.', ',')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <input
                id="isFeatured"
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                Adicionar como destaque
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Produtos em destaque aparecem no carrossel principal do cardápio.
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <input
                id="isPromotion"
                type="checkbox"
                checked={isPromotion}
                onChange={(e) => setIsPromotion(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isPromotion" className="ml-2 block text-sm text-gray-700">
                Adicionar como promoção
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Produtos em promoção exibem um selo especial.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!selectedProductId || (!isFeatured && !isPromotion)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              selectedProductId && (isFeatured || isPromotion)
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isFeatured ? (
              <>
                <Star size={18} className="mr-1" />
                Adicionar Destaque
              </>
            ) : isPromotion ? (
              <>
                <Tag size={18} className="mr-1" />
                Adicionar Promoção
              </>
            ) : (
              'Selecione uma opção'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-8">
        <h4 className="text-md font-medium text-gray-800 mb-4">Produtos em Destaque e Promoção</h4>
        
        {products.filter(p => p.isFeatured || p.isPromotion).length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhum produto em destaque ou promoção.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter(p => p.isFeatured || p.isPromotion)
              .map(product => (
                <div key={product.id} className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-10 h-10 rounded-full object-cover mr-3" 
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <div className="flex items-center mt-1">
                        {product.isFeatured && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 mr-1">
                            Destaque
                          </span>
                        )}
                        {product.isPromotion && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                            Promoção
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onSetFeatured(product.id, false, false)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionForm;