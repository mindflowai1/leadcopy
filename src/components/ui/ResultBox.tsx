import React from 'react';
import { Copy, Edit, Check } from 'lucide-react';

interface CopyResult {
  id: string;
  content: string;
  timestamp: Date;
}

interface ResultBoxProps {
  result: CopyResult;
  onCopy: (content: string) => void;
  onRefine: (content: string) => void;
  isCopied?: boolean;
}

const ResultBox: React.FC<ResultBoxProps> = ({
  result,
  onCopy,
  onRefine,
  isCopied = false
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all-smooth hover-lift relative overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all-smooth"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-accent/20 to-accent/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">{result.id.split('-')[1]}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">
              Opção {result.id.split('-')[1]}
            </h3>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {result.timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-text leading-relaxed whitespace-pre-wrap text-gray-700">
            {result.content}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => onCopy(result.content)}
            className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all-smooth hover-lift ${
              isCopied 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </div>
          </button>
          
          <button
            onClick={() => onRefine(result.content)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-primary font-medium rounded-xl hover:shadow-lg transition-all-smooth hover-lift hover-glow"
          >
            <div className="flex items-center justify-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Refinar</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultBox;
export type { CopyResult };
