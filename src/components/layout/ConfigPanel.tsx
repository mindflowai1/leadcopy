import React, { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';
import { VOICE_TONE_OPTIONS, PLATFORM_OPTIONS, LENGTH_OPTIONS } from '../../types';

interface ConfigPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  voiceTone: string;
  setVoiceTone: (tone: string) => void;
  platform: string;
  setPlatform: (platform: string) => void;
  length: string;
  setLength: (length: string) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  creativityLevel: 'low' | 'medium' | 'high';
  setCreativityLevel: (level: 'low' | 'medium' | 'high') => void;
  onGenerate: () => void;
  isLoading: boolean;
  className?: string;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  prompt,
  setPrompt,
  voiceTone,
  setVoiceTone,
  platform,
  setPlatform,
  length,
  setLength,
  keywords,
  setKeywords,
  creativityLevel,
  setCreativityLevel,
  onGenerate,
  isLoading,
  className = ''
}) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Gerar sugestões de palavras-chave baseadas no prompt
  useEffect(() => {
    if (prompt.length > 10) {
      const suggestions = generateKeywordSuggestions(prompt, platform);
      setSuggestedKeywords(suggestions);
    } else {
      setSuggestedKeywords([]);
    }
  }, [prompt, platform]);

  // Validar campos obrigatórios
  const validateFields = () => {
    const errors: {[key: string]: string} = {};
    
    if (!prompt.trim()) {
      errors.prompt = 'Prompt é obrigatório';
    }
    if (!voiceTone) {
      errors.voiceTone = 'Tom de voz é obrigatório';
    }
    if (!platform) {
      errors.platform = 'Plataforma é obrigatória';
    }
    if (!length) {
      errors.length = 'Tamanho é obrigatório';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Função para gerar sugestões de palavras-chave
  const generateKeywordSuggestions = (prompt: string, platform: string): string[] => {
    const words = prompt.toLowerCase().split(/\s+/);
    const suggestions: string[] = [];
    
    // Palavras-chave baseadas no conteúdo
    const contentKeywords = words.filter(word => 
      word.length > 3 && 
      !['para', 'com', 'uma', 'que', 'dos', 'das', 'pelo', 'pela'].includes(word)
    ).slice(0, 3);
    
    suggestions.push(...contentKeywords);
    
    // Palavras-chave baseadas na plataforma
    const platformKeywords: {[key: string]: string[]} = {
      instagram: ['instagram', 'social', 'engajamento', 'hashtag'],
      blog: ['blog', 'conteúdo', 'artigo', 'leitura'],
      website: ['site', 'web', 'online', 'digital'],
      email: ['email', 'newsletter', 'marketing', 'promoção'],
      product: ['produto', 'venda', 'qualidade', 'benefício'],
      ad: ['anúncio', 'publicidade', 'conversão', 'cta'],
      social: ['social', 'compartilhamento', 'viral', 'trending'],
      landing: ['landing', 'conversão', 'lead', 'venda']
    };
    
    if (platformKeywords[platform]) {
      suggestions.push(...platformKeywords[platform].slice(0, 2));
    }
    
    // Remover duplicatas e limitar a 5 sugestões
    return [...new Set(suggestions)].slice(0, 5);
  };

  const handleAddKeyword = (keyword: string) => {
    if (keyword && !keywords.includes(keyword) && keywords.length < 10) {
      setKeywords([...keywords, keyword]);
      setKeywordInput('');
    }
  };

  const handleGenerate = () => {
    if (validateFields()) {
      onGenerate();
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
              {/* Background Professional */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50 opacity-60"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-2xl"></div>
      
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-teal-200/30 p-8 hover-lift transition-all-smooth animate-fade-in-left">
        <div className="space-y-8">
          {/* Header Professional */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-blue-500/30 rounded-full blur-lg group-hover:blur-xl transition-all-smooth"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
              <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                          Gere sua Copy Profissional
                        </h2>
              </div>
            </div>
          </div>

          {/* Prompt Principal */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-3">
              <span className="flex items-center space-x-2">
                <span>Descreva seu projeto de copy</span>
                <span className="text-red-500 text-lg">*</span>
              </span>
            </label>
            <div className="relative">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (validationErrors.prompt) {
                    setValidationErrors(prev => ({ ...prev, prompt: '' }));
                  }
                }}
                placeholder="Descreva seu projeto... Ex: 'Um post para Instagram sobre nosso novo produto de skincare'"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none h-28 transition-all-smooth hover:border-teal-300 ${
                          validationErrors.prompt ? 'border-red-300 bg-red-50' : 'border-teal-200 bg-gradient-to-r from-teal-50/30 to-blue-50/30'
                        }`}
                required
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {prompt.length}/500
              </div>
            </div>
            {validationErrors.prompt && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.prompt}</p>
            )}
          </div>

          {/* Grid de Configurações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* Tom de Voz */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="voiceTone" className="block text-sm font-semibold text-gray-700 mb-3">
              <span className="flex items-center space-x-2">
                <span>Tom de Voz</span>
                <span className="text-red-500 text-lg">*</span>
              </span>
              </label>
              <div className="relative">
                <select
                  id="voiceTone"
                  value={voiceTone}
                  onChange={(e) => {
                    setVoiceTone(e.target.value);
                    if (validationErrors.voiceTone) {
                      setValidationErrors(prev => ({ ...prev, voiceTone: '' }));
                    }
                  }}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all-smooth hover:border-teal-300 appearance-none bg-gradient-to-r from-teal-50/30 to-blue-50/30 ${
                            validationErrors.voiceTone ? 'border-red-300 bg-red-50' : 'border-teal-200'
                          }`}
                >
                  <option value="">Selecione o tom de voz</option>
                  {VOICE_TONE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {validationErrors.voiceTone && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.voiceTone}</p>
              )}
            </div>

            {/* Plataforma/Uso */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 mb-3">
              <span className="flex items-center space-x-2">
                <span>Plataforma/Destino</span>
                <span className="text-red-500 text-lg">*</span>
              </span>
              </label>
              <div className="relative">
                <select
                  id="platform"
                  value={platform}
                  onChange={(e) => {
                    setPlatform(e.target.value);
                    if (validationErrors.platform) {
                      setValidationErrors(prev => ({ ...prev, platform: '' }));
                    }
                  }}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all-smooth hover:border-teal-300 appearance-none bg-gradient-to-r from-teal-50/30 to-blue-50/30 ${
                            validationErrors.platform ? 'border-red-300 bg-red-50' : 'border-teal-200'
                          }`}
                >
                  <option value="">Selecione a plataforma</option>
                  {PLATFORM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {validationErrors.platform && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.platform}</p>
              )}
            </div>
          </div>

          {/* Tamanho Desejado */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <label htmlFor="length" className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="flex items-center space-x-2">
              <span>Tamanho do Conteúdo</span>
              <span className="text-red-500 text-lg">*</span>
            </span>
            </label>
            <div className="relative">
              <select
                id="length"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                  if (validationErrors.length) {
                    setValidationErrors(prev => ({ ...prev, length: '' }));
                  }
                }}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all-smooth hover:border-teal-300 appearance-none bg-gradient-to-r from-teal-50/30 to-blue-50/30 ${
                          validationErrors.length ? 'border-red-300 bg-red-50' : 'border-teal-200'
                        }`}
              >
                <option value="">Selecione o tamanho</option>
                {LENGTH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {validationErrors.length && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.length}</p>
            )}
          </div>

          {/* Nível de Criatividade */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <label htmlFor="creativityLevel" className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="flex items-center space-x-2">
              <span>Nível de Criatividade</span>
            </span>
            </label>
            <div className="relative">
              <select
                id="creativityLevel"
                value={creativityLevel}
                onChange={(e) => setCreativityLevel(e.target.value as 'low' | 'medium' | 'high')}
                        className="w-full px-4 py-3 border border-teal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all-smooth hover:border-teal-300 appearance-none bg-gradient-to-r from-teal-50/30 to-blue-50/30"
              >
                <option value="low">Baixa - Precisão e factualidade</option>
                <option value="medium">Média - Equilíbrio criatividade/precisão</option>
                <option value="high">Alta - Máxima criatividade</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {creativityLevel === 'low' && 'Ideal para descrições técnicas e SEO'}
              {creativityLevel === 'medium' && 'Perfeito para copy profissional equilibrado'}
              {creativityLevel === 'high' && 'Excelente para campanhas criativas e branding'}
            </p>
          </div>

          {/* Palavras-Chave */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="flex items-center space-x-2">
              <span>Palavras-Chave (SEO)</span>
              <span className="text-gray-400 text-sm font-normal">(opcional)</span>
            </span>
            </label>
            
            {/* Sugestões Inteligentes */}
            {suggestedKeywords.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">💡 Sugestões baseadas no seu projeto:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddKeyword(suggestion)}
                      disabled={keywords.includes(suggestion) || keywords.length >= 10}
                              className={`px-3 py-1 text-xs rounded-full border transition-all-smooth ${
                                keywords.includes(suggestion) || keywords.length >= 10
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 border-teal-200 hover:from-teal-200 hover:to-blue-200 hover:border-teal-300'
                              }`}
                    >
                      + {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
                    <div className="border border-teal-200 rounded-xl p-3 min-h-[50px] focus-within:ring-2 focus-within:ring-teal-400 focus-within:border-transparent transition-all-smooth hover:border-teal-300 bg-gradient-to-r from-teal-50/30 to-blue-50/30">
              <div className="flex flex-wrap gap-2 mb-2">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                            className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-200/50 to-blue-200/50 text-gray-800 text-sm rounded-full border border-teal-300/50 hover:border-teal-400/50 transition-all-smooth"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => setKeywords(keywords.filter((_, i) => i !== index))}
                      className="ml-2 hover:text-red-500 transition-colors"
                      aria-label={`Remover ${keyword}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              {keywords.length < 10 && (
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Digite uma palavra-chave e pressione Enter"
                  className="w-full border-none outline-none bg-transparent text-sm placeholder-gray-400"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyword(keywordInput);
                    }
                  }}
                />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Máximo de 10 palavras-chave • {keywords.length}/10 utilizadas
            </p>
          </div>

          {/* Botão de Geração */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
                      className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all-smooth hover-lift relative overflow-hidden group min-h-[56px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span>Gerando Copy...</span>
                </div>
              ) : (
                        <span className="relative z-10 flex items-center justify-center">
                          Gerar Copy
                        </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;