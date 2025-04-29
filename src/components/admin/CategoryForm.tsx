import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface CategoryFormProps {
  onSubmit: (name: string) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Adicionar Nova Categoria</h3>
      
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <div className="flex-1">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Categoria
          </label>
          <input
            id="categoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <PlusCircle size={18} className="mr-1" />
          Adicionar
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;