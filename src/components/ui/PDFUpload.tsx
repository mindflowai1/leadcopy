import React, { useRef, useState } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PDFProcessor, PDFProcessingResult } from '../../services/pdfProcessor';

interface PDFUploadProps {
  onFileUpload: (file: File, content: string) => void;
  onRemove: () => void;
  uploadedFile?: File;
  content?: string;
  className?: string;
}

const PDFUpload: React.FC<PDFUploadProps> = ({
  onFileUpload,
  onRemove,
  uploadedFile,
  content,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!PDFProcessor.validatePDF(file)) {
      setError('Por favor, selecione apenas arquivos PDF válidos.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      const result: PDFProcessingResult = await PDFProcessor.processPDF(file);
      
      if (result.success) {
        onFileUpload(file, result.content);
        setError(null);
      } else {
        setError(result.error || 'Erro ao processar o PDF');
      }
    } catch (error) {
      console.error('Erro ao processar PDF:', error);
      setError('Erro inesperado ao processar o arquivo. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Estado: Arquivo carregado com sucesso
  if (uploadedFile && content) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {uploadedFile.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {PDFProcessor.formatFileSize(uploadedFile.size)} • PDF processado
                </p>
              </div>
            </div>
            <button
              onClick={onRemove}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 line-clamp-2">
              {content.substring(0, 150)}...
            </p>
          </div>
          
          <div className="mt-3 flex items-center space-x-2 text-xs text-green-600">
            <CheckCircle className="w-3 h-3" />
            <span>Pronto para personalização da copy</span>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Erro
  if (error) {
    return (
      <div className={`bg-white rounded-xl border border-red-200 shadow-sm ${className}`}>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-900">Erro no Upload</h3>
              <p className="text-xs text-red-600 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="p-1 text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Processando
  if (isProcessing) {
    return (
      <div className={`bg-white rounded-xl border border-blue-200 shadow-sm ${className}`}>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">Processando PDF</h3>
              <p className="text-xs text-blue-600 mt-1">Extraindo conteúdo...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Upload inicial
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Informações do Cliente</h3>
          </div>
          <span className="text-xs text-gray-500">Opcional</span>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-lg p-4 transition-all duration-200 cursor-pointer ${
            isDragging
              ? 'border-teal-400 bg-teal-50'
              : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            
            <p className="text-sm font-medium text-gray-700 mb-1">
              Arraste o PDF aqui ou clique para selecionar
            </p>
            <p className="text-xs text-gray-500">
              Máximo 10MB • Apenas PDF
            </p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="mt-3 text-xs text-gray-500">
          <p className="mb-1">O PDF será analisado para extrair:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Informações sobre o negócio</li>
            <li>Público-alvo e personas</li>
            <li>Produtos/serviços oferecidos</li>
            <li>Diferenciais competitivos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PDFUpload;
