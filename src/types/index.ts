export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  combo: boolean;
  isPromotion: boolean;
  isFeatured: boolean;
  components: ProductComponent[];
  type: 'burger' | 'acai' | 'drink' | 'combo';
}

export interface ProductComponent {
  id: string;
  name: string;
  price: number;
  isRemovable: boolean;
  isOptional: boolean;
  category: 'bread' | 'meat' | 'vegetable' | 'sauce' | 'cheese' | 'fruit' | 'topping' | 'syrup';
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  removedComponents: string[];
  addedComponents: string[];
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'rejected';
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: 'credit' | 'debit' | 'cash' | 'pix';
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderReceipt {
  orderId: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    removedComponents: string[];
    addedComponents: string[];
  }[];
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  total: number;
  date: Date;
  status: string;
}