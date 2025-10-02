import React, { useState } from 'react';
import { XCircle, Eye, Copy, ThumbsUp, MessageSquare, Loader2 } from 'lucide-react';
import { SectionVariation } from '../../schemas/copySchemas';

interface SectionVariationsProps {
  variations: SectionVariation[];
  sectionName: string;
  onApprove: (variation: SectionVariation, sectionName: string) => void;
  onRefine: (variation: SectionVariation, feedback: string, sectionName: string) => void;
  isLoading?: boolean;
}

const SectionVariations: React.FC<SectionVariationsProps> = ({
  variations,
  sectionName,
  onApprove,
  onRefine,
  isLoading = false
}) => {
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentVariationForRefine, setCurrentVariationForRefine] = useState<SectionVariation | null>(null);

  const getVariationColor = (variation: string) => {
    switch (variation) {
      case 'A': return 'from-red-500 to-red-600';
      case 'B': return 'from-blue-500 to-blue-600';
      case 'C': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getVariationFocus = (variation: string) => {
    switch (variation) {
      case 'A': return 'Foco no Problema/Dor';
      case 'B': return 'Foco na Solução/Benefício';
      case 'C': return 'Foco no Resultado/Transformação';
      default: return '';
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleApprove = (variation: SectionVariation) => {
    onApprove(variation, sectionName);
  };

  const handleRefine = (variation: SectionVariation) => {
    setCurrentVariationForRefine(variation);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    if (currentVariationForRefine && feedback.trim()) {
      onRefine(currentVariationForRefine, feedback, sectionName);
      setShowFeedbackModal(false);
      setFeedback('');
      setCurrentVariationForRefine(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Variações para: {sectionName}
            </h2>
            <p className="text-gray-600 mt-2">
              Escolha uma variação para aprovar ou solicite refinamentos
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {variations.map((variation, index) => {
          const variationLetter = ['A', 'B', 'C'][index];
          return (
            <div
              key={index}
              className={`relative bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-lg flex flex-col ${
                selectedVariation === variationLetter 
                  ? 'border-teal-400 shadow-lg' 
                  : 'border-gray-200 hover:border-teal-300'
              }`}
            >
              {/* Header da Variação */}
              <div className={`p-4 bg-gradient-to-r ${getVariationColor(variationLetter)} rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-lg">{variationLetter}</span>
                    <span className="text-white/90 text-sm">{getVariationFocus(variationLetter)}</span>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setSelectedVariation(
                        selectedVariation === variationLetter ? null : variationLetter
                      )}
                      className="p-1 text-white/80 hover:text-white transition-colors"
                    >
                      {selectedVariation === variationLetter ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Conteúdo da Variação */}
              <div className="p-6 flex-1">
                {/* Headline */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Headline</h3>
                    <button
                      onClick={() => handleCopy(variation.headline)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-lg font-bold text-gray-900 leading-tight">
                    {variation.headline}
                  </p>
                </div>

                {/* Sub-headline */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Sub-headline</h3>
                    <button
                      onClick={() => handleCopy(variation.subheadline)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {variation.subheadline}
                  </p>
                </div>

                {/* Texto Principal */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Texto Principal</h3>
                    <button
                      onClick={() => handleCopy(variation.mainText)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {variation.mainText}
                  </p>
                </div>

                {/* Bullet Points */}
                {variation.bulletPoints && variation.bulletPoints.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Pontos Principais</h3>
                      <button
                        onClick={() => handleCopy(variation.bulletPoints!.join('\n'))}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {variation.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cards */}
                {variation.cards && variation.cards.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Cards</h3>
                      <button
                        onClick={() => handleCopy(variation.cards!.map(card => `${card.title}: ${card.text}`).join('\n'))}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {variation.cards.map((card, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <h4 className="font-semibold text-gray-900 mb-1">{card.title}</h4>
                          <p className="text-gray-600 text-sm">{card.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="px-4 md:px-6 pb-4 md:pb-6 mt-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleApprove(variation)}
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-h-[44px]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ThumbsUp className="w-4 h-4" />
                        <span>Aprovar</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleRefine(variation)}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Refinar</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Feedback */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Feedback para Refinamento
            </h3>
            <p className="text-gray-600 mb-4">
              Descreva o que você gostaria de mudar ou melhorar nesta variação:
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Ex: O headline poderia ser mais direto, o texto principal precisa de mais urgência, adicionar mais benefícios específicos..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedback('');
                  setCurrentVariationForRefine(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={!feedback.trim() || isLoading}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionVariations;