import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Button from '../ui/Button';
import APISetup from '../ui/APISetup';

const Header: React.FC = () => {
  const [showAPISetup, setShowAPISetup] = useState(false);

  return (
    <>
              <header className="bg-white shadow-md relative overflow-hidden border-b border-gray-200">
                <div className="relative z-10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                      {/* Logo */}
                      <div className="flex items-center space-x-3 animate-fade-in-left">
                        <img 
                          src="/logo2.png" 
                          alt="Attena Logo" 
                          className="w-auto h-12 hover:scale-105 transition-transform duration-300 logo-transparent"
                        />
                      </div>
                      
                      {/* Botão de Configuração */}
                      <div className="animate-fade-in-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Settings}
                          onClick={() => setShowAPISetup(true)}
                          className="bg-teal-50 hover:bg-teal-100 text-teal-700 border-teal-200 hover:border-teal-300 transition-all-smooth hover-lift"
                          aria-label="Configurar API"
                        >
                          Configurar API
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
      
      {/* Modal de Configuração */}
      {showAPISetup && (
        <APISetup onClose={() => setShowAPISetup(false)} />
      )}
    </>
  );
};

export default Header;
