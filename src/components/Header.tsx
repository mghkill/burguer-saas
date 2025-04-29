import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center">
            <ShoppingBag 
              size={28} 
              className={`${isScrolled ? 'text-purple-700' : 'text-purple-600'} mr-2`} 
            />
            <span 
              className={`font-bold text-xl ${
                isScrolled ? 'text-gray-800' : 'text-gray-800'
              }`}
            >
              BurgerAçaí
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/admin/login" 
              className={`flex items-center px-3 py-2 rounded-md ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <User size={18} className="mr-1" />
              <span>Admin</span>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-700' : 'text-gray-800'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <Link 
              to="/admin/login" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <span>Admin</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;