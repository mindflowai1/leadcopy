import React, { useState } from 'react';
import Header from './components/layout/Header';
import ConfigPanel from './components/layout/ConfigPanel';
import ResultsPanel from './components/layout/ResultsPanel';
import Footer from './components/layout/Footer';
import ErrorNotification from './components/ui/ErrorNotification';
import PDFUpload from './components/ui/PDFUpload';
import LandingStructure from './components/ui/LandingStructure';
import SectionVariations from './components/ui/SectionVariations';
import { CopyResult } from './components/ui/ResultBox';
import { generateSectionCopyWithGemini, refineCopyWithFeedback } from './services/geminiAPI';
import { CopyRequest, LandingConfig, LandingSection, SectionVariation } from './schemas/copySchemas';

const App: React.FC = () => {
  // Estados do formulário
  const [prompt, setPrompt] = useState('');
  const [voiceTone, setVoiceTone] = useState('');
  const [platform, setPlatform] = useState('');
  const [length, setLength] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [creativityLevel, setCreativityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Estados da landing page
  const [landingConfig, setLandingConfig] = useState<LandingConfig>({
    funil: 'vendas',
    ticket: 'medium',
    secoes: [],
    pdfContent: '',
    clienteInfo: ''
  });
  
  // Estados do PDF
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfContent, setPdfContent] = useState<string>('');
  
  // Estados dos resultados
  const [currentSection, setCurrentSection] = useState<string>('');
  const [currentVariations, setCurrentVariations] = useState<SectionVariation[]>([]);
  const [approvedSections, setApprovedSections] = useState<Map<string, SectionVariation>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [history] = useState<CopyResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState<'config' | 'structure' | 'generation' | 'approval'>('config');
  
  // Log de mudanças de estado
  React.useEffect(() => {
    console.log('🔄 [STATE] Current step mudou para:', currentStep);
  }, [currentStep]);

  React.useEffect(() => {
    console.log('📝 [STATE] Current section mudou para:', currentSection);
  }, [currentSection]);

  React.useEffect(() => {
    console.log('✅ [STATE] Approved sections mudou:', Array.from(approvedSections.keys()));
  }, [approvedSections]);

  React.useEffect(() => {
    console.log('📊 [STATE] Landing config mudou:', landingConfig.secoes.map(s => ({ nome: s.nome, status: s.status })));
  }, [landingConfig]);

  const handlePDFUpload = (file: File, content: string) => {
    setPdfFile(file);
    setPdfContent(content);
    setLandingConfig(prev => ({
      ...prev,
      pdfContent: content
    }));
  };

  const handlePDFRemove = () => {
    setPdfFile(null);
    setPdfContent('');
    setLandingConfig(prev => ({
      ...prev,
      pdfContent: ''
    }));
  };

  const handleSectionsChange = (sections: LandingSection[]) => {
    setLandingConfig(prev => ({
      ...prev,
      secoes: sections
    }));
  };

  const handleGenerateSection = async (sectionName: string) => {
    console.log('🚀 [GENERATE] Iniciando geração para seção:', sectionName);
    console.log('📋 [GENERATE] Prompt:', prompt);
    console.log('⚙️ [GENERATE] Landing config:', landingConfig);
    
    if (!prompt.trim()) {
      console.log('❌ [GENERATE] Prompt vazio, cancelando');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCurrentSection(sectionName);
    
    try {
      const request: CopyRequest = {
        prompt,
        voiceTone,
        platform,
        length,
        keywords,
        creativityLevel,
        landingConfig
      };
      
      console.log('📤 [GENERATE] Enviando requisição:', request);
      
      const variations = await generateSectionCopyWithGemini(request, sectionName);
      console.log('📥 [GENERATE] Variações recebidas:', variations);
      
      setCurrentVariations(variations);
      setCurrentStep('approval');
      
      console.log('✅ [GENERATE] Mudando para step approval');
      
    } catch (error) {
      console.error('❌ [GENERATE] Erro ao gerar copy:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido ao gerar copy');
    } finally {
      setIsLoading(false);
      console.log('🏁 [GENERATE] Finalizando geração');
    }
  };

  const handleApproveVariation = (variation: SectionVariation, sectionName: string) => {
    console.log('🎯 [APPROVE] Iniciando aprovação:', { sectionName, variation });
    
    setApprovedSections(prev => {
      const newMap = new Map(prev.set(sectionName, variation));
      console.log('✅ [APPROVE] Seções aprovadas atualizadas:', Array.from(newMap.keys()));
      return newMap;
    });
    
    // Marcar a seção atual como aprovada
    const updatedSections = landingConfig.secoes.map(section =>
      section.nome === sectionName 
        ? { ...section, status: 'aprovado' as const }
        : section
    );
    
    console.log('📝 [APPROVE] Seções atualizadas:', updatedSections.map(s => ({ nome: s.nome, status: s.status })));
    
    setLandingConfig(prev => ({ ...prev, secoes: updatedSections }));
    
    // Verificar se todas as seções foram aprovadas
    const nextSection = updatedSections.find(s => s.status === 'pendente');
    console.log('🔍 [APPROVE] Próxima seção encontrada:', nextSection);
    
    if (nextSection) {
      console.log('➡️ [APPROVE] Indo para próxima seção:', nextSection.nome);
      setCurrentStep('generation');
      setCurrentSection('');
      setCurrentVariations([]);
      
      // Gerar a próxima seção automaticamente
      setTimeout(() => {
        console.log('🔄 [APPROVE] Gerando próxima seção:', nextSection.nome);
        handleGenerateSection(nextSection.nome);
      }, 100);
    } else {
      console.log('🏁 [APPROVE] Todas as seções aprovadas - mostrando resultados finais');
      setCurrentStep('config');
      setShowResults(true);
    }
  };


  const handleRefineVariation = async (variation: SectionVariation, feedback: string, sectionName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const request: CopyRequest = {
        prompt,
        voiceTone,
        platform,
        length,
        keywords,
        creativityLevel,
        landingConfig
      };
      
      const refinedVariations = await refineCopyWithFeedback(request, sectionName, feedback, variation);
      setCurrentVariations(refinedVariations);
      
    } catch (error) {
      console.error('Erro ao refinar copy:', error);
      setError(error instanceof Error ? error.message : 'Erro ao refinar copy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartGeneration = () => {
    console.log('🎬 [START] Iniciando geração de copy');
    console.log('📊 [START] Seções disponíveis:', landingConfig.secoes.map(s => ({ nome: s.nome, status: s.status })));
    
    if (landingConfig.secoes.length === 0) {
      console.log('❌ [START] Nenhuma seção definida');
      setError('Defina pelo menos uma seção antes de gerar a copy');
      return;
    }
    
    console.log('🔄 [START] Resetando seções aprovadas');
    setCurrentStep('generation');
    setApprovedSections(new Map());
    
    // Começar com a primeira seção
    const firstSection = landingConfig.secoes[0];
    console.log('🎯 [START] Primeira seção:', firstSection);
    handleGenerateSection(firstSection.nome);
  };

  const handleRefine = (content: string) => {
    setPrompt(`Refinar este copy: ${content}`);
    setCurrentStep('config');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-white to-blue-50/30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 relative min-h-screen">
          {/* Container para transições */}
          <div className="relative min-h-screen">
          {error && (
            <ErrorNotification 
              error={error} 
              onClose={() => setError(null)}
            />
          )}

          {/* Step 1: Configuração */}
          <div className={`transition-all duration-500 ease-in-out ${
            currentStep === 'config' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
          }`}>
            <div className="space-y-6 md:space-y-8">
              {/* Upload de PDF */}
              <PDFUpload
                onFileUpload={handlePDFUpload}
                onRemove={handlePDFRemove}
                uploadedFile={pdfFile || undefined}
                content={pdfContent}
              />

              {/* Configuração da Landing Page */}
              <div className="max-w-4xl mx-auto">
                <ConfigPanel
                  prompt={prompt}
                  setPrompt={setPrompt}
                  voiceTone={voiceTone}
                  setVoiceTone={setVoiceTone}
                  platform={platform}
                  setPlatform={setPlatform}
                  length={length}
                  setLength={setLength}
                  keywords={keywords}
                  setKeywords={setKeywords}
                  creativityLevel={creativityLevel}
                  setCreativityLevel={setCreativityLevel}
                  onGenerate={() => setCurrentStep('structure')}
                  isLoading={isLoading}
                />
              </div>

              {/* Botão para iniciar geração */}
              {landingConfig.secoes.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={handleStartGeneration}
                    className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-2xl hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    🚀 Iniciar Geração de Copy
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Estrutura */}
          <div className={`transition-all duration-500 ease-in-out ${
            currentStep === 'structure' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
          }`}>
            <div className="max-w-4xl mx-auto">
              <LandingStructure
                sections={landingConfig.secoes}
                onSectionsChange={handleSectionsChange}
              />
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentStep('config')}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors mr-4"
                >
                  Voltar
                </button>
                <button
                  onClick={handleStartGeneration}
                  disabled={landingConfig.secoes.length === 0}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-2xl hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🚀 Iniciar Geração
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Geração */}
          <div className={`transition-all duration-500 ease-in-out ${
            currentStep === 'generation' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
          }`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Gerando Copy para: {currentSection}
                </h2>
                <p className="text-gray-600">
                  Aguarde enquanto nossa IA cria variações personalizadas...
                </p>
              </div>
              
              {isLoading && (
                <div className="text-center py-16">
                  <div className="relative">
                    {/* Círculo principal girando */}
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-500 mx-auto mb-6"></div>
                    
                    {/* Círculo interno com efeito pulsante */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Texto com efeito de digitação */}
                  <div className="space-y-2">
                    <p className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                      ✨ Attena está trabalhando...
                    </p>
                    <p className="text-gray-600 animate-pulse">
                      Gerando variações personalizadas de copy
                    </p>
                    
                    {/* Pontos animados */}
                    <div className="flex justify-center space-x-1 mt-4">
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 4: Aprovação */}
          <div className={`transition-all duration-500 ease-in-out ${
            currentStep === 'approval' && currentVariations.length > 0
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
          }`}>
            <div className="max-w-7xl mx-auto">
              <SectionVariations
                sectionName={currentSection}
                variations={currentVariations}
                onApprove={handleApproveVariation}
                onRefine={handleRefineVariation}
                isLoading={isLoading}
              />
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    console.log('🔄 [REGENERATE] Gerando novas variações para:', currentSection);
                    setCurrentStep('generation');
                    handleGenerateSection(currentSection);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Gerar Novas Variações
                </button>
              </div>
            </div>
          </div>

          {/* Resultados Finais */}
          <div className={`transition-all duration-500 ease-in-out ${
            showResults && approvedSections.size > 0
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
          }`}>
            <div className="max-w-6xl mx-auto">
              <ResultsPanel
                results={Array.from(approvedSections.entries()).map(([sectionName, section]) => ({
                  id: sectionName,
                  content: `${section.headline}\n\n${section.subheadline}\n\n${section.mainText}${section.bulletPoints ? '\n\n' + section.bulletPoints.join('\n') : ''}${section.cards ? '\n\n' + section.cards.map(card => `${card.title}: ${card.text}`).join('\n') : ''}`,
                  timestamp: new Date()
                }))}
                isLoading={isLoading}
                history={history}
                onRefine={handleRefine}
              />
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setCurrentStep('config');
                    setShowResults(false);
                    setApprovedSections(new Map());
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-2xl hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  ✨ Gerar Nova Landing Page
                </button>
              </div>
            </div>
          </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default App;