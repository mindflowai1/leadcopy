import React from 'react';
import { CopyResult } from './ResultBox';
import { Clock, Sparkles } from 'lucide-react';

interface HistoryPanelProps {
  history: CopyResult[];
  onSelectResult: (result: CopyResult) => void;
  className?: string;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelectResult,
  className = ''
}) => {
  if (history.length === 0) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Background Athena */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50 opacity-60"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-200/10 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-200/30 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Histórico de Gerações
            </h3>
          </div>
          
          <div className="text-center py-8">
            <p className="text-gray-600 text-sm">
              Nenhuma geração registrada ainda
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Athena */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50 opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-200/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-200/30 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Histórico de Gerações
                  </h3>
                </div>
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-blue-100 px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-teal-700">{history.length}</span>
          </div>
        </div>
        
        {/* Lista de Histórico */}
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          {history.slice(0, 8).map((result, index) => (
            <button
              key={result.id}
              onClick={() => onSelectResult(result)}
              className="w-full text-left p-4 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-blue-50/50 rounded-xl transition-all-smooth hover-lift border border-teal-200/30 hover:border-amber-300/50 group"
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-1.5 h-1.5 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-800 font-medium leading-relaxed mb-2 group-hover:text-teal-700 transition-colors">
                    {result.content.substring(0, 80)}...
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{result.timestamp.toLocaleString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {history.length > 8 && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-blue-100 px-4 py-2 rounded-full">
              <span className="text-sm text-teal-700 font-medium">
                +{history.length - 8} gerações adicionais
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
