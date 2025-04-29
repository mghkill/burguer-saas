import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product, ProductComponent, CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailsDialogProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [removedComponents, setRemovedComponents] = useState<string[]>([]);
  const [addedComponents, setAddedComponents] = useState<string[]>([]);

  const handleComponentToggle = (componentId: string, isRemoved: boolean) => {
    if (isRemoved) {
      setRemovedComponents([...removedComponents, componentId]);
    } else {
      setRemovedComponents(removedComponents.filter(id => id !== componentId));
    }
  };

  const handleExtraComponentToggle = (componentId: string) => {
    if (addedComponents.includes(componentId)) {
      setAddedComponents(addedComponents.filter(id => id !== componentId));
    } else {
      setAddedComponents([...addedComponents, componentId]);
    }
  };

  const calculateTotal = () => {
    let total = product.price * quantity;
    
    addedComponents.forEach(componentId => {
      const component = product.components.find(c => c.id === componentId);
      if (component) {
        total += component.price * quantity;
      }
    });

    return total;
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      quantity,
      removedComponents,
      addedComponents,
      totalPrice: calculateTotal(),
    });
    onClose();
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 w-[calc(100%-2rem)] sm:w-full sm:max-w-2xl max-h-[calc(100vh-2rem)] bg-white rounded-lg shadow-xl overflow-hidden z-50">
          <div className="flex flex-col h-full max-h-[calc(100vh-2rem)]">
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <Dialog.Close className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white">
                <X size={20} />
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 mb-6">
                {product.description}
              </Dialog.Description>

              <div className="space-y-6">
                {/* Components Section */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Componentes:</h3>
                  <div className="space-y-2">
                    {product.components.map(component => (
                      <div
                        key={component.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-gray-700">{component.name}</span>
                        {component.isRemovable && (
                          <button
                            onClick={() => handleComponentToggle(
                              component.id,
                              !removedComponents.includes(component.id)
                            )}
                            className={`px-3 py-1 rounded text-sm ${
                              removedComponents.includes(component.id)
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {removedComponents.includes(component.id) ? 'Remover' : 'Incluído'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extras Section */}
                {product.components.some(c => c.isOptional) && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Adicionar extras:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.components
                        .filter(c => c.isOptional)
                        .map(component => (
                          <button
                            key={component.id}
                            onClick={() => handleExtraComponentToggle(component.id)}
                            className={`p-2 rounded border ${
                              addedComponents.includes(component.id)
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-500'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{component.name}</span>
                              <span className="text-sm text-gray-600">
                                + R$ {component.price.toFixed(2)}
                              </span>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed bottom bar */}
            <div className="sticky bottom-0 bg-white border-t p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  <span>Adicionar R$ {calculateTotal().toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProductDetailsDialog;