import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BurgerAçaí</h3>
            <p className="text-gray-300 mb-4">
              Os melhores hambúrgueres e açaís da região, preparados com ingredientes frescos e de qualidade.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Av. Principal, 123, Centro, Cidade - UF</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">(00) 98765-4321</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock size={18} className="mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Segunda a Sexta: 11h às 22h</p>
                  <p className="text-gray-300">Sábado e Domingo: 11h às 23h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BurgerAçaí. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;