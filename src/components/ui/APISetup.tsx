import React, { useState } from 'react';
import { Settings, Key, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './Button';
import { validateGeminiAPIKey } from '../../services/geminiAPI';

interface APISetupProps {
  onClose: () => void;
}

const APISetup: React.FC<APISetupProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<'success' | 'error' | null>(null);

  const handleSaveAPIKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setValidationResult('success');
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleValidateAPIKey = async () => {
    if (!apiKey.trim()) return;
    
    setIsValidating(true);
    setValidationResult(null);
    
    try {
      // Validação real da API Key usando a função do serviço
      const isValid = await validateGeminiAPIKey(apiKey);
      
      if (isValid) {
        setValidationResult('success');
      } else {
        setValidationResult('error');
      }
    } catch (error) {
      setValidationResult('error');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-text">
                Configuração da API
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Chave da API do Google Gemini
              </label>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSyB..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <Button
                  onClick={handleValidateAPIKey}
                  isLoading={isValidating}
                  size="sm"
                  icon={Key}
                >
                  Validar
                </Button>
              </div>
              
              {validationResult === 'success' && (
                <div className="flex items-center space-x-2 mt-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">API key válida!</span>
                </div>
              )}
              
              {validationResult === 'error' && (
                <div className="flex items-center space-x-2 mt-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">API key inválida</span>
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h3 className="text-sm font-medium text-blue-800 mb-1">
                Como obter sua API key:
              </h3>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Acesse <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
                <li>2. Faça login com sua conta Google</li>
                <li>3. Clique em "Create API Key"</li>
                <li>4. Copie a chave gerada</li>
              </ol>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveAPIKey}
                disabled={!apiKey.trim() || validationResult !== 'success'}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APISetup;
