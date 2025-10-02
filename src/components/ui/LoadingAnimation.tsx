import React from 'react';
import { Brain, Zap, Sparkles } from 'lucide-react';

interface LoadingAnimationProps {
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Professional */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50 opacity-60"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/30 p-12">
        <div className="text-center">
          {/* Main Loading Animation */}
          <div className="relative mb-8">
            {/* Central Brain Icon with Pulse */}
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-teal-600/30 rounded-full blur-lg animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <Brain className="w-12 h-12 text-white animate-pulse" />
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text with Typing Animation */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text text-transparent mb-4">
              Gerando Copy Inteligente
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-gray-600 font-medium ml-3">Analisando seu prompt</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">Processando contexto</span>
              </div>
              <div className="w-8 h-1 bg-green-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
                <span className="text-gray-700">Aplicando estratégias de copy</span>
              </div>
              <div className="w-8 h-1 bg-blue-200 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
                <span className="text-gray-700">Otimizando para conversão</span>
              </div>
              <div className="w-8 h-1 bg-amber-200 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
              </div>
            </div>
          </div>

          {/* Professional Message */}
          <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200/30">
            <p className="text-sm text-gray-600 leading-relaxed">
              Nossa IA está analisando seu prompt e criando copy otimizado para máxima conversão. 
              Isso pode levar alguns segundos para garantir a melhor qualidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
