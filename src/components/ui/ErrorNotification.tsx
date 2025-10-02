import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ErrorNotificationProps {
  error: string | null;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800 mb-1">
              Erro ao Gerar Copy
            </h3>
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-3 text-red-400 hover:text-red-600 transition-colors"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;




