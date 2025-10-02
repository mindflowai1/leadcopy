import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
            <footer className="bg-gradient-to-r from-teal-600 via-blue-800 to-teal-600 text-white relative overflow-hidden">
              {/* Background Effects Professional */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-teal-200/20 to-transparent rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-blue-200/10 to-transparent rounded-full blur-2xl animate-float animation-delay-2000"></div>
              </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
                    {/* Brand Section Professional */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center space-x-3 animate-fade-in-left">
                        <img 
                          src="./logo2.png" 
                          alt="Attena Logo" 
                          className="w-auto h-12 hover:scale-105 transition-transform duration-300 logo-transparent footer-logo"
                        />
                      </div>
              
                      <p className="text-teal-100 leading-relaxed max-w-md animate-fade-in-up">
                        Transforme suas ideias em copy persuasivo e eficaz com o poder da inteligência artificial avançada. 
                        Crie conteúdo profissional para qualquer plataforma em segundos.
                      </p>
              
              <div className="flex space-x-4 animate-fade-in-up">
                <a 
                  href="#" 
                          className="w-10 h-10 bg-white/10 hover:bg-teal-300/20 rounded-lg flex items-center justify-center transition-all-smooth hover-lift group"
                  aria-label="GitHub"
                >
                          <Github className="w-5 h-5 group-hover:text-teal-300 transition-colors" />
                </a>
                <a 
                  href="#" 
                          className="w-10 h-10 bg-white/10 hover:bg-teal-300/20 rounded-lg flex items-center justify-center transition-all-smooth hover-lift group"
                  aria-label="Twitter"
                >
                          <Twitter className="w-5 h-5 group-hover:text-teal-300 transition-colors" />
                </a>
                <a 
                  href="#" 
                          className="w-10 h-10 bg-white/10 hover:bg-teal-300/20 rounded-lg flex items-center justify-center transition-all-smooth hover-lift group"
                  aria-label="LinkedIn"
                >
                          <Linkedin className="w-5 h-5 group-hover:text-teal-300 transition-colors" />
                </a>
                <a 
                  href="#" 
                          className="w-10 h-10 bg-white/10 hover:bg-teal-300/20 rounded-lg flex items-center justify-center transition-all-smooth hover-lift group"
                  aria-label="Email"
                >
                          <Mail className="w-5 h-5 group-hover:text-teal-300 transition-colors" />
                </a>
              </div>
            </div>
            
            {/* Features Section */}
            <div className="space-y-6 animate-fade-in-up">
              <h4 className="text-lg font-semibold text-white">Recursos</h4>
              <ul className="space-y-3">
                {[
                  'Geração com IA',
                  'Múltiplas Variações',
                  'Tons Personalizados',
                  'Otimização por Plataforma',
                  'Histórico de Projetos',
                  'Exportação de Resultados'
                ].map((feature, index) => (
                  <li 
                    key={feature}
                    className="text-gray-300 hover:text-accent transition-colors cursor-pointer flex items-center group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support Section */}
            <div className="space-y-6 animate-fade-in-up">
              <h4 className="text-lg font-semibold text-white">Suporte</h4>
              <ul className="space-y-3">
                {[
                  'Central de Ajuda',
                  'Documentação',
                  'Tutoriais',
                  'Comunidade',
                  'Contato',
                  'Status do Sistema'
                ].map((item, index) => (
                  <li 
                    key={item}
                    className="text-gray-300 hover:text-accent transition-colors cursor-pointer flex items-center group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-300 animate-fade-in-left">
                <span>© {currentYear} Attena.</span>
              </div>
              
              {/* Legal Links */}
              <div className="flex space-x-6 text-sm animate-fade-in-right">
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  Termos de Uso
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
      </div>
    </footer>
  );
};

export default Footer;
