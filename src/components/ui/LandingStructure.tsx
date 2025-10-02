import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff, Layout } from 'lucide-react';
import { LandingSection } from '../../schemas/copySchemas';

interface LandingStructureProps {
  sections: LandingSection[];
  onSectionsChange: (sections: LandingSection[]) => void;
  className?: string;
}

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero', description: 'Seção principal com headline e CTA' },
  { value: 'prova_social', label: 'Prova Social', description: 'Depoimentos, números e credibilidade' },
  { value: 'oferta', label: 'Oferta', description: 'Produto/serviço e proposta de valor' },
  { value: 'depoimentos', label: 'Depoimentos', description: 'Testemunhos de clientes' },
  { value: 'garantia', label: 'Garantia', description: 'Redução de risco e confiança' },
  { value: 'faq', label: 'FAQ', description: 'Perguntas frequentes' },
  { value: 'custom', label: 'Personalizada', description: 'Seção customizada' }
];

const LandingStructure: React.FC<LandingStructureProps> = ({
  sections,
  onSectionsChange,
  className = ''
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addSection = () => {
    const newSection: LandingSection = {
      id: `section-${Date.now()}`,
      nome: 'Nova Seção',
      ordem: sections.length + 1,
      tipo: 'custom',
      status: 'pendente'
    };
    onSectionsChange([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    const updatedSections = sections
      .filter(section => section.id !== id)
      .map((section, index) => ({ ...section, ordem: index + 1 }));
    onSectionsChange(updatedSections);
  };

  const updateSection = (id: string, updates: Partial<LandingSection>) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    );
    onSectionsChange(updatedSections);
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    
    // Atualizar ordens
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      ordem: index + 1
    }));
    
    onSectionsChange(updatedSections);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveSection(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado': return 'text-green-600 bg-green-100';
      case 'gerando': return 'text-blue-600 bg-blue-100';
      case 'rejeitado': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado': return <Eye className="w-4 h-4" />;
      case 'gerando': return <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />;
      case 'rejeitado': return <EyeOff className="w-4 h-4" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Athena */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50 opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-200/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-200/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg">
              <Layout className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Estrutura da Landing Page
            </h3>
            <div className="px-3 py-1 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full">
              <span className="text-sm font-semibold text-teal-700">{sections.length}</span>
            </div>
          </div>
          
          <button
            onClick={addSection}
            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Adicionar Seção</span>
          </button>
        </div>
        
        {sections.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-2xl inline-block mb-4">
              <GripVertical className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4">Nenhuma seção definida ainda</p>
            <p className="text-sm text-gray-500">Clique em "Adicionar Seção" para começar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="group bg-white rounded-xl border border-gray-200 hover:border-teal-300 transition-all duration-200 hover:shadow-md"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-teal-100 transition-colors">
                      <GripVertical className="w-4 h-4 text-gray-500 group-hover:text-teal-600" />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                      {/* Nome da Seção */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Nome da Seção
                        </label>
                        <input
                          type="text"
                          value={section.nome}
                          onChange={(e) => updateSection(section.id, { nome: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                          placeholder="Ex: Hero, Prova Social..."
                        />
                      </div>
                      
                      {/* Tipo da Seção */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Tipo
                        </label>
                        <select
                          value={section.tipo}
                          onChange={(e) => updateSection(section.id, { tipo: e.target.value as any })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        >
                          {SECTION_TYPES.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Status */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(section.status)}`}>
                          {getStatusIcon(section.status)}
                          <span className="capitalize">{section.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Descrição do Tipo */}
                  <div className="mt-3 ml-11">
                    <p className="text-xs text-gray-500">
                      {SECTION_TYPES.find(type => type.value === section.tipo)?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {sections.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
            <div className="flex items-center space-x-2 text-sm text-teal-700">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>
                <strong>{sections.length}</strong> seções definidas • 
                Arraste para reordenar • 
                Clique em "Gerar Copy" para começar
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingStructure;
