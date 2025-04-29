import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/admin/dashboard" className="flex items-center">
            <ShoppingBag size={24} className="mr-2" />
            <span className="font-bold text-lg">BurgerAçaí Admin</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-white hover:text-purple-200 text-sm">
              Ver Cardápio
            </Link>
            
            <button 
              onClick={onLogout}
              className="flex items-center text-white hover:text-purple-200"
            >
              <LogOut size={18} className="mr-1" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;