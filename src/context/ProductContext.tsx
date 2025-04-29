import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Product, Category } from '../types';

// Sample data
const initialCategories: Category[] = [
  { id: 'cat1', name: 'Hambúrgueres' },
  { id: 'cat2', name: 'Açaís' },
  { id: 'cat3', name: 'Combos' },
  { id: 'cat4', name: 'Bebidas' },
];

const initialProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Burger Clássico',
    description: 'Hambúrguer de carne bovina, queijo cheddar, alface, tomate e molho especial.',
    price: 25.90,
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    categoryId: 'cat1',
    combo: false,
    isPromotion: false,
    isFeatured: true,
    type: 'burger',
    components: [
      { id: 'comp1', name: 'Pão Brioche', price: 0, isRemovable: false, isOptional: false, category: 'bread' },
      { id: 'comp2', name: 'Hambúrguer 200g', price: 0, isRemovable: false, isOptional: false, category: 'meat' },
      { id: 'comp3', name: 'Queijo Cheddar', price: 0, isRemovable: true, isOptional: true, category: 'cheese' },
      { id: 'comp4', name: 'Alface', price: 0, isRemovable: true, isOptional: false, category: 'vegetable' },
      { id: 'comp5', name: 'Tomate', price: 0, isRemovable: true, isOptional: false, category: 'vegetable' },
      { id: 'comp6', name: 'Molho Especial', price: 0, isRemovable: true, isOptional: false, category: 'sauce' },
      { id: 'comp7', name: 'Bacon', price: 4.00, isRemovable: false, isOptional: true, category: 'meat' },
      { id: 'comp8', name: 'Ovo', price: 3.00, isRemovable: false, isOptional: true, category: 'meat' },
      { id: 'comp9', name: 'Cebola Caramelizada', price: 3.00, isRemovable: false, isOptional: true, category: 'vegetable' }
    ]
  },
  {
    id: 'prod2',
    name: 'Açaí Tradicional 500ml',
    description: 'Açaí puro, banana, granola e leite condensado.',
    price: 18.90,
    imageUrl: 'https://images.pexels.com/photos/5946642/pexels-photo-5946642.jpeg',
    categoryId: 'cat2',
    combo: false,
    isPromotion: false,
    isFeatured: true,
    type: 'acai',
    components: [
      { id: 'comp10', name: 'Açaí', price: 0, isRemovable: false, isOptional: false, category: 'fruit' },
      { id: 'comp11', name: 'Banana', price: 0, isRemovable: true, isOptional: false, category: 'fruit' },
      { id: 'comp12', name: 'Granola', price: 0, isRemovable: true, isOptional: false, category: 'topping' },
      { id: 'comp13', name: 'Leite Condensado', price: 0, isRemovable: true, isOptional: false, category: 'syrup' },
      { id: 'comp14', name: 'Morango', price: 3.00, isRemovable: false, isOptional: true, category: 'fruit' },
      { id: 'comp15', name: 'Kiwi', price: 4.00, isRemovable: false, isOptional: true, category: 'fruit' },
      { id: 'comp16', name: 'Nutella', price: 5.00, isRemovable: false, isOptional: true, category: 'topping' }
    ]
  }
];

interface ProductContextType {
  products: Product[];
  categories: Category[];
  featuredProducts: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
  setFeaturedProduct: (id: string, isFeatured: boolean, isPromotion: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const featuredProducts = products.filter(product => product.isFeatured);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: uuidv4(),
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const addCategory = (name: string) => {
    const newCategory = {
      id: uuidv4(),
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
    setProducts(products.filter(product => product.categoryId !== id));
  };

  const setFeaturedProduct = (id: string, isFeatured: boolean, isPromotion: boolean) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, isFeatured, isPromotion } 
        : product
    ));
  };

  const value = {
    products,
    categories,
    featuredProducts,
    addProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    setFeaturedProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};