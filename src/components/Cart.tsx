import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Receipt } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import OrderStatus from './OrderStatus';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'cash' | 'pix'>('credit');
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'pending' | 'accepted' | 'preparing' | 'ready' | 'rejected' | null>(null);

  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { products } = useProducts();

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const handleCheckout = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Simulate order processing
    setOrderStatus('pending');
    
    // Simulate order flow
    setTimeout(() => {
      setOrderStatus('accepted');
      setTimeout(() => {
        setOrderStatus('preparing');
        setTimeout(() => {
          setOrderStatus('ready');
          const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
          generateReceipt(orderId);
        }, 3000);
      }, 2000);
    }, 2000);
  };

  const generateReceipt = (orderId: string) => {
    const receipt = `
=================================
        BURGERAÇAÍ
        PEDIDO #${orderId}
=================================
${format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR })}

ITENS DO PEDIDO:
${items.map(item => {
  const product = getProductDetails(item.productId);
  return `
${product?.name} x${item.quantity}
${item.removedComponents.length > 0 ? '  Removidos: ' + item.removedComponents.join(', ') : ''}
${item.addedComponents.length > 0 ? '  Adicionais: ' + item.addedComponents.join(', ') : ''}
R$ ${item.totalPrice.toFixed(2)}
`}).join('\n')}
---------------------------------
TOTAL: R$ ${total.toFixed(2)}

CLIENTE:
Nome: ${customerName}
Telefone: ${customerPhone}
Endereço: ${customerAddress}

Forma de Pagamento: ${paymentMethod.toUpperCase()}

=================================
      Pedido Confirmado!
     Agradecemos a preferência
=================================
`;

    // Create a blob and download the receipt
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedido-${orderId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    // Reset cart and form after a delay
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setIsOpen(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setPaymentMethod('credit');
      setOrderStatus(null);
    }, 3000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-30"
      >
        <ShoppingCart size={24} />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">Carrinho</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {orderStatus && <OrderStatus status={orderStatus} />}

                  {items.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Seu carrinho está vazio
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map(item => {
                        const product = getProductDetails(item.productId);
                        return (
                          <div key={item.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                            <img
                              src={product?.imageUrl}
                              alt={product?.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">{product?.name}</h3>
                              {item.removedComponents.length > 0 && (
                                <p className="text-sm text-red-600">
                                  Removidos: {item.removedComponents.join(', ')}
                                </p>
                              )}
                              {item.addedComponents.length > 0 && (
                                <p className="text-sm text-green-600">
                                  Adicionais: {item.addedComponents.join(', ')}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="p-1 hover:bg-gray-200 rounded"
                                  >
                                    <Minus size={16} />
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-200 rounded"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                R$ {item.totalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {items.length > 0 && !orderStatus && (
                  <div className="border-t p-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-lg font-bold">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>

                    {!showCheckout ? (
                      <button
                        onClick={() => setShowCheckout(true)}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                      >
                        Finalizar Pedido
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Nome completo"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="tel"
                          placeholder="Telefone"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                        <textarea
                          placeholder="Endereço de entrega"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full p-2 border rounded"
                          rows={3}
                        />
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value as any)}
                          className="w-full p-2 border rounded"
                        >
                          <option value="credit">Cartão de Crédito</option>
                          <option value="debit">Cartão de Débito</option>
                          <option value="pix">PIX</option>
                          <option value="cash">Dinheiro</option>
                        </select>
                        <button
                          onClick={handleCheckout}
                          disabled={orderStatus === 'pending'}
                          className={`w-full py-3 rounded-lg flex items-center justify-center ${
                            orderStatus === 'pending'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700'
                          } text-white`}
                        >
                          {orderStatus === 'pending' ? (
                            'Processando...'
                          ) : (
                            <>
                              <Receipt size={20} className="mr-2" />
                              Confirmar Pedido
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;