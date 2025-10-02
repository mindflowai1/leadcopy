import React, { useState } from 'react';
import { CopyResult } from '../ui/ResultBox';
import LoadingAnimation from '../ui/LoadingAnimation';
import HistoryPanel from '../ui/HistoryPanel';
import { Copy, Edit3, Clock, Star, Brain, ChevronDown, ChevronUp } from 'lucide-react';

interface ResultsPanelProps {
  id?: string;
  results: CopyResult[];
  isLoading: boolean;
  history: CopyResult[];
  onRefine: (content: string) => void;
  className?: string;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  id,
  results,
  isLoading,
  history,
  onRefine,
  className = ''
}) => {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [expandedResults, setExpandedResults] = useState<Record<string, boolean>>({});

  const handleCopy = async (content: string, resultId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedStates(prev => ({ ...prev, [resultId]: true }));
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [resultId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSelectFromHistory = (result: CopyResult) => {
    onRefine(result.content);
  };

  const toggleExpanded = (resultId: string) => {
    setExpandedResults(prev => ({
      ...prev,
      [resultId]: !prev[resultId]
    }));
  };

  return (
    <div id={id} className={`space-y-8 ${className}`}>
      {/* Resultados Principais - Tema Athena */}
      <div className="relative overflow-hidden">
        {/* Background Athena */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50 opacity-60"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/30 p-8">
          {/* Header Athena */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-blue-500/30 rounded-full blur-lg group-hover:blur-xl transition-all-smooth"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
              <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Resultados Inteligentes
                </h2>
                <p className="text-sm text-gray-600 flex items-center space-x-2">
                  <span>Gerado com Claude AI Sonnet 4.5</span>
                </p>
              </div>
            </div>
            
            {results.length > 0 && (
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-blue-100 px-4 py-2 rounded-full">
                      <Star className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-semibold text-teal-700">{results.length} variações</span>
                    </div>
            )}
          </div>
          
                  {isLoading ? (
                    <LoadingAnimation />
                  ) : results.length > 0 ? (
                    <div className="space-y-8 results-fade-in">
              {results.map((result, index) => (
                <div 
                  key={result.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative group">
                    {/* Card Athena */}
                            <div className="bg-gradient-to-br from-white via-teal-50/50 to-blue-50/50 border-2 border-teal-200/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all-smooth hover-lift relative overflow-hidden">
                      
                      {/* Decorative Elements */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-200/20 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all-smooth"></div>
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all-smooth"></div>
                      
                      {/* Header do Resultado */}
                      <div className="relative z-10 mb-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                                <Star className="w-2.5 h-2.5 text-white" />
                              </div>
                            </div>
                            <div>
                                        <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                                Estratégia {index + 1}
                              </h3>
                              <p className="text-sm text-gray-600 flex items-center space-x-2">
                                <span>Copy profissional otimizado</span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1.5 rounded-full">
                            <Clock className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-xs text-gray-600 font-medium">
                              {result.timestamp.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit', 
                                second: '2-digit' 
                              })}
                            </span>
                          </div>
                          
                          {/* Botão Expandir/Minimizar */}
                          <button
                            onClick={() => toggleExpanded(result.id)}
                            className="p-2 bg-gradient-to-r from-teal-100 to-blue-100 hover:from-teal-200 hover:to-blue-200 rounded-lg transition-all-smooth hover-lift"
                            aria-label={expandedResults[result.id] ? "Minimizar" : "Expandir"}
                          >
                            {expandedResults[result.id] ? (
                              <ChevronUp className="w-5 h-5 text-teal-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-teal-600" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Conteúdo do Copy - Condicionalmente Visível */}
                      {expandedResults[result.id] && (
                        <>
                          <div className="relative z-10 mb-8">
                            <div className="prose prose-lg max-w-none">
                              <div className="bg-gradient-to-r from-gray-50 to-teal-50/50 rounded-xl p-6 border border-teal-200/30">
                                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base font-medium">
                                  {result.content}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Botões de Ação Athena */}
                          <div className="relative z-10 flex gap-4">
                        <button 
                          onClick={() => handleCopy(result.content, result.id)}
                          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all-smooth hover-lift border-2 ${
                            copiedStates[result.id] 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-lg' 
                              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            {copiedStates[result.id] ? (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-5 h-5" />
                                <span>Copiar Copy</span>
                              </>
                            )}
                          </div>
                        </button>
                        
                        <button 
                          onClick={() => onRefine(result.content)}
                                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all-smooth hover-lift relative overflow-hidden group"
                        >
                          <div className="relative z-10 flex items-center justify-center space-x-2">
                            <Edit3 className="w-5 h-5 group-hover:animate-pulse" />
                            <span>Refinar Copy</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in-up">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Aguardando Geração de Copy
              </h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
                Configure suas opções e gere copy profissional para qualquer plataforma com inteligência artificial avançada
              </p>
              
              <div className="mt-8 flex justify-center">
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full">
                          <span className="text-teal-700 font-semibold">Pronto para gerar copy profissional</span>
                        </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Histórico Athena */}
      <HistoryPanel
        history={history}
        onSelectResult={handleSelectFromHistory}
      />
    </div>
  );
};

export default ResultsPanel;
