import { z } from 'zod';

// Schema para upload de PDF
export const PDFUploadSchema = z.object({
  file: z.instanceof(File),
  content: z.string().optional()
});

// Schema para definição de seções da landing page
export const LandingSectionSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, 'Nome da seção é obrigatório'),
  ordem: z.number().min(1),
  tipo: z.enum(['hero', 'prova_social', 'oferta', 'faq', 'depoimentos', 'garantia', 'custom']),
  status: z.enum(['pendente', 'gerando', 'aprovado', 'rejeitado']).default('pendente')
});

// Schema para configuração da landing page
export const LandingConfigSchema = z.object({
  funil: z.enum(['captura', 'vendas']),
  ticket: z.enum(['low', 'medium', 'high']),
  secoes: z.array(LandingSectionSchema),
  pdfContent: z.string().optional(),
  clienteInfo: z.string().optional()
});

// Schema para bullet points e cards
export const ContentItemSchema = z.object({
  tipo: z.enum(['bullet', 'card']),
  titulo: z.string().min(1),
  texto: z.string().min(1)
});

// Schema para variação de copy de seção
export const SectionVariationSchema = z.object({
  headline: z.string().min(10, 'Headline deve ter no mínimo 10 caracteres'),
  subheadline: z.string().min(10, 'Sub-headline deve ter no mínimo 10 caracteres'),
  mainText: z.string().min(20, 'Texto principal deve ter no mínimo 20 caracteres'),
  bulletPoints: z.array(z.string()).optional(),
  cards: z.array(z.object({
    title: z.string().min(1),
    text: z.string().min(1)
  })).optional()
});

// Schema para resposta completa do Gemini (3 variações)
export const GeminiResponseSchema = z.object({
  variations: z.array(SectionVariationSchema).length(3, 'Deve ter exatamente 3 variações')
});

// Schema para validação dos dados de entrada
export const CopyRequestSchema = z.object({
  prompt: z.string().min(10, 'Prompt deve ter no mínimo 10 caracteres'),
  voiceTone: z.string().min(1, 'Tom de voz é obrigatório'),
  platform: z.string().min(1, 'Plataforma é obrigatória'),
  length: z.string().min(1, 'Tamanho é obrigatório'),
  keywords: z.array(z.string()),
  creativityLevel: z.enum(['low', 'medium', 'high']).default('medium'),
  landingConfig: LandingConfigSchema.optional()
});

// Schema para feedback de refinamento
export const FeedbackSchema = z.object({
  secaoId: z.string(),
  variacao: z.enum(['A', 'B', 'C']),
  feedback: z.string().min(10, 'Feedback deve ter no mínimo 10 caracteres'),
  mudancas: z.string().optional()
});

// Tipos TypeScript derivados dos schemas
export type PDFUpload = z.infer<typeof PDFUploadSchema>;
export type LandingSection = z.infer<typeof LandingSectionSchema>;
export type LandingConfig = z.infer<typeof LandingConfigSchema>;
export type ContentItem = z.infer<typeof ContentItemSchema>;
export type SectionVariation = z.infer<typeof SectionVariationSchema>;
export type GeminiResponse = z.infer<typeof GeminiResponseSchema>;
export type CopyRequest = z.infer<typeof CopyRequestSchema>;
export type Feedback = z.infer<typeof FeedbackSchema>;

// Configurações de temperatura baseadas no nível de criatividade
export const CREATIVITY_CONFIG = {
  low: { temperature: 0.3, description: 'Precisão e factualidade' },
  medium: { temperature: 0.7, description: 'Equilíbrio entre criatividade e precisão' },
  high: { temperature: 0.9, description: 'Máxima criatividade e originalidade' }
} as const;

// Configurações por tipo de ticket
export const TICKET_CONFIG = {
  low: { 
    temperatura: 0.6, 
    foco: 'Benefícios imediatos e facilidade de acesso',
    tom: 'Direto e acessível'
  },
  medium: { 
    temperatura: 0.7, 
    foco: 'Valor agregado e diferenciação',
    tom: 'Profissional e persuasivo'
  },
  high: { 
    temperatura: 0.8, 
    foco: 'Transformação e exclusividade',
    tom: 'Autoritário e sofisticado'
  }
} as const;

// Configurações por tipo de funil
export const FUNIL_CONFIG = {
  captura: {
    foco: 'Lead generation e engajamento',
    cta_principal: 'Capturar interesse',
    prova_social: 'Relevante mas não excessiva'
  },
  vendas: {
    foco: 'Conversão direta e fechamento',
    cta_principal: 'Comprar agora',
    prova_social: 'Intensa e convincente'
  }
} as const;
