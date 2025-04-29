import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

interface OrderStatusProps {
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'rejected';
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'Aguardando confirmação do estabelecimento',
        };
      case 'accepted':
        return {
          icon: CheckCircle2,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'Pedido aceito! Aguarde enquanto preparamos',
        };
      case 'preparing':
        return {
          icon: Clock,
          color: 'text-purple-500',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'Seu pedido está sendo preparado',
        };
      case 'ready':
        return {
          icon: CheckCircle2,
          color: 'text-green-500',
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'Pedido pronto! Retire no balcão',
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'Pedido não aceito. Entre em contato com o estabelecimento',
        };
    }
  };

  const info = getStatusInfo();
  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${info.bg} ${info.border} border rounded-lg p-4 mb-4`}
    >
      <div className="flex items-center">
        <Icon className={`${info.color} w-6 h-6 mr-3`} />
        <span className={`${info.color} font-medium`}>{info.text}</span>
      </div>
    </motion.div>
  );
};

export default OrderStatus;