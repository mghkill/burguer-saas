import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-800 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onClick={handleLogoClick}
        className="cursor-pointer"
      >
        <div className="flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-10 shadow-2xl border border-white border-opacity-20">
          <ShoppingBag size={80} className="text-white mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">BurgerAçaí</h1>
          <p className="text-white text-opacity-90 text-center text-lg md:text-xl">Sabores que conquistam</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 bg-pink-600 text-white rounded-full font-medium text-lg"
          >
            Acessar Cardápio
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;