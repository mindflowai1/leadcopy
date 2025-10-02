// Integração com Google Gemini API - Versão Profissional Attena
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  GeminiResponseSchema, 
  CopyRequest, 
  GeminiResponse, 
  TICKET_CONFIG,
  FUNIL_CONFIG,
  LandingConfig,
  SectionVariation
} from '../schemas/copySchemas';

interface GeminiRequest extends CopyRequest {
  landingConfig?: LandingConfig;
  currentSection?: string;
  pdfContent?: string;
}

// Função para obter a API key
const getAPIKey = (): string => {
  // Primeiro tenta do localStorage (configuração do usuário)
  const localKey = localStorage.getItem('gemini_api_key');
  if (localKey) return localKey;
  
  // Depois tenta da variável de ambiente (apenas em build)
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey) return envKey;
  
  // API key padrão para desenvolvimento (sua chave)
  const defaultKey = 'AIzaSyABWaGn70HC5XGRwuXD3WoSQHyGnenNRMQ';
  
  // Salva automaticamente no localStorage para não precisar configurar toda vez
  localStorage.setItem('gemini_api_key', defaultKey);
  
  return defaultKey;
};

// Função para gerar copy de seção específica com Gemini usando JSON estruturado
export const generateSectionCopyWithGemini = async (
  request: GeminiRequest,
  sectionName: string
): Promise<SectionVariation[]> => {
  const apiKey = getAPIKey();
  
  if (!apiKey) {
    throw new Error('API Key do Gemini não encontrada. Configure sua chave na seção de configurações.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Configuração baseada no tipo de ticket
  const ticketConfig = request.landingConfig?.ticket ? TICKET_CONFIG[request.landingConfig.ticket] : TICKET_CONFIG.medium;
  const funilConfig = request.landingConfig?.funil ? FUNIL_CONFIG[request.landingConfig.funil] : FUNIL_CONFIG.vendas;
  
  // Configuração do modelo
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      temperature: ticketConfig.temperatura,
      maxOutputTokens: 2048,
      topP: 0.8,
      topK: 40
    }
  });

  // System instruction profissional baseado em David Ogilvy
  const systemInstruction = `Você é o Copywriter Chefe 'Attena', um especialista em Marketing de Resposta Direta com a profundidade e o brilho de grandes mestres da publicidade, como David Ogilvy. Sua missão é gerar copy de landing page que converte, altamente personalizada e estruturada.

Contexto/PDF Crítico: ${request.pdfContent ? `Use o seguinte conteúdo do PDF do cliente como fonte primária de verdade: ${request.pdfContent}` : 'Nenhum PDF fornecido - use o prompt do usuário como base.'}

Filosofia de Copy (Inspirada em David Ogilvy):
- "O consumidor não é um idiota. Ela é sua esposa." - Sempre respeite a inteligência do público
- "Se você não conseguir vender o produto, pelo menos venda a empresa" - Foque em credibilidade
- "A publicidade que funciona é aquela que vende" - Cada palavra deve ter propósito comercial
- Clareza sobre criatividade: "Não faça publicidade que você não quer que sua família veja"
- Benefícios sobre características: "Venda o buraco, não a broca"

Adaptação por Ticket:
- LOW TICKET: ${TICKET_CONFIG.low.foco} - Tom: ${TICKET_CONFIG.low.tom}
- MEDIUM TICKET: ${TICKET_CONFIG.medium.foco} - Tom: ${TICKET_CONFIG.medium.tom}  
- HIGH TICKET: ${TICKET_CONFIG.high.foco} - Tom: ${TICKET_CONFIG.high.tom}

Adaptação por Funil:
- CAPTURA: ${funilConfig.foco} - CTA: ${funilConfig.cta_principal}
- VENDAS: ${funilConfig.foco} - CTA: ${funilConfig.cta_principal}

Estrutura de Saída (JSON Requerido): Toda a copy gerada deve ser retornada em um formato JSON estrito, seção por seção.`;

  // Prompt específico para a seção
  const getSectionGuidance = (sectionName: string) => {
    const sectionLower = sectionName.toLowerCase();
    
    if (sectionLower.includes('hero') || sectionLower.includes('principal')) {
      return `HERO SECTION - Foco principal:
- Headline: Deve ser impactante e capturar atenção imediata
- Sub-headline: Promessa clara do benefício principal
- Main Text: Problema que o produto resolve
- Bullet Points: Benefícios principais (3-4 pontos)
- Cards: Funcionalidades ou módulos principais`;
    }
    
    if (sectionLower.includes('prova') || sectionLower.includes('social')) {
      return `PROVA SOCIAL SECTION - Credibilidade:
- Headline: Foco em resultados e transformações
- Sub-headline: Números, estatísticas ou depoimentos
- Main Text: Histórias de sucesso e resultados comprovados
- Bullet Points: Benefícios específicos alcançados
- Cards: Depoimentos, números ou casos de sucesso`;
    }
    
    if (sectionLower.includes('oferta') || sectionLower.includes('produto')) {
      return `OFERTA SECTION - Conversão:
- Headline: Foco no valor e urgência
- Sub-headline: Oferta específica e benefícios exclusivos
- Main Text: Detalhes da oferta e garantias
- Bullet Points: O que está incluído na oferta
- Cards: Bônus, garantias ou ofertas especiais`;
    }
    
    if (sectionLower.includes('depoimento') || sectionLower.includes('testimonial')) {
      return `DEPOIMENTOS SECTION - Confiança:
- Headline: Foco em transformações reais
- Sub-headline: Resultados específicos de clientes
- Main Text: Histórias detalhadas de sucesso
- Bullet Points: Benefícios específicos mencionados
- Cards: Depoimentos detalhados com fotos/nomes`;
    }
    
    if (sectionLower.includes('faq') || sectionLower.includes('duvida')) {
      return `FAQ SECTION - Objeções:
- Headline: Foco em resolver dúvidas comuns
- Sub-headline: Tranquilidade e clareza
- Main Text: Explicação sobre o produto/serviço
- Bullet Points: Perguntas frequentes respondidas
- Cards: Dúvidas específicas com respostas detalhadas`;
    }
    
    return `SEÇÃO PERSONALIZADA - ${sectionName}:
- Headline: Foco específico para esta seção
- Sub-headline: Benefício relacionado à seção
- Main Text: Conteúdo relevante para o contexto
- Bullet Points: Pontos específicos da seção
- Cards: Elementos únicos desta seção`;
  };

  const prompt = `Gere 3 variações completas para a seção "${sectionName}" da landing page:

${getSectionGuidance(sectionName)}

Parâmetros:
- Seção: ${sectionName}
- Funil: ${request.landingConfig?.funil || 'vendas'}
- Ticket: ${request.landingConfig?.ticket || 'medium'}
- Prompt Base: ${request.prompt}
- Palavras-chave: ${request.keywords.join(', ')}

IMPORTANTE: Cada variação deve ter um ângulo diferente e ser específica para a seção "${sectionName}". Não repita conteúdo de outras seções.

Estrutura de Saída (JSON Obrigatória para CADA Variação):
{
  "variations": [
    {
      "headline": "A Headline que Captura a Atenção",
      "subheadline": "A Sub-headline que Promete o Benefício Central", 
      "mainText": "Um breve parágrafo de apoio que valida a promessa.",
      "bulletPoints": ["Benefício 1 Rápido", "Benefício 2 Claro", "Benefício 3 Tangível"],
      "cards": [
        {
          "title": "Mini Título do Card",
          "text": "Texto explicativo do Card/Funcionalidade."
        }
      ]
    }
  ]
}

Gere exatamente 3 variações (A, B, C), cada uma com um ângulo de copy ligeiramente diferente:
- Variação A: Foco no Problema/Dor
- Variação B: Foco na Solução/Benefício  
- Variação C: Foco no Resultado/Transformação

Use apenas os campos necessários para a seção. Se não precisar de cards, omita o campo "cards". Se não precisar de bullet points, omita "bulletPoints".

Use princípios de Ogilvy: clareza, credibilidade, benefícios tangíveis e CTAs persuasivos.`;

  try {
    const result = await model.generateContent([
      {
        text: systemInstruction
      },
      {
        text: prompt
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Limpar o texto removendo blocos de código markdown
    let cleanText = text.trim();
    
    // Remover ```json e ``` se presentes
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    // Tentar fazer parse do JSON
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      console.error('Resposta recebida:', text);
      console.error('Texto limpo:', cleanText);
      throw new Error('Resposta da IA não está no formato JSON esperado. Tente novamente.');
    }

    // Validar com Zod
    const validatedResponse = GeminiResponseSchema.parse(jsonResponse);
    
    return validatedResponse.variations;
    
  } catch (error) {
    console.error('Erro na API do Gemini:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API Key')) {
        throw new Error('Chave da API inválida. Verifique sua configuração.');
      } else if (error.message.includes('quota')) {
        throw new Error('Limite de uso da API atingido. Tente novamente mais tarde.');
      } else if (error.message.includes('safety')) {
        throw new Error('Conteúdo bloqueado por políticas de segurança. Tente reformular seu prompt.');
      }
    }
    
    throw new Error('Erro ao gerar copy. Tente novamente.');
  }
};

// Função para refinamento baseado em feedback
export const refineCopyWithFeedback = async (
  request: GeminiRequest,
  sectionName: string,
  feedback: string,
  currentVariation: SectionVariation
): Promise<SectionVariation[]> => {
  const apiKey = getAPIKey();
  
  if (!apiKey) {
    throw new Error('API Key do Gemini não encontrada.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      topP: 0.8,
      topK: 40
    }
  });

  const systemInstruction = `Você é o Copywriter Chefe 'Attena', especialista em Marketing de Resposta Direta inspirado em David Ogilvy. Sua missão é refinar copy baseado em feedback específico do cliente.

Contexto do Cliente: ${request.pdfContent || 'Nenhum contexto específico fornecido.'}
Funil: ${request.landingConfig?.funil || 'vendas'}
Ticket: ${request.landingConfig?.ticket || 'medium'}`;

  const prompt = `Refine a variação da seção "${sectionName}" baseado no feedback:

FEEDBACK DO CLIENTE: ${feedback}

COPY ATUAL:
- Headline: ${currentVariation.headline}
- Sub-headline: ${currentVariation.subheadline}
- Texto Principal: ${currentVariation.mainText}
${currentVariation.bulletPoints ? `- Bullet Points: ${currentVariation.bulletPoints.join(', ')}` : ''}
${currentVariation.cards ? `- Cards: ${currentVariation.cards.map(card => `${card.title}: ${card.text}`).join(', ')}` : ''}

Gere uma nova variação refinada seguindo o feedback fornecido. Mantenha a qualidade e o tom profissional, mas incorpore as sugestões específicas do usuário.

Responda APENAS com um JSON válido no formato:
{
  "variations": [
    {
      "headline": "Nova headline refinada",
      "subheadline": "Nova sub-headline refinada", 
      "mainText": "Novo texto principal refinado",
      "bulletPoints": ["Ponto 1", "Ponto 2", "Ponto 3"],
      "cards": [
        {
          "title": "Título do Card",
          "text": "Texto do Card"
        }
      ]
    }
  ]
}`;

  try {
    const result = await model.generateContent([
      { text: systemInstruction },
      { text: prompt }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Limpar o texto removendo blocos de código markdown
    let cleanText = text.trim();
    
    // Remover ```json e ``` se presentes
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      throw new Error('Resposta da IA não está no formato JSON esperado.');
    }

    const validatedResponse = GeminiResponseSchema.parse(jsonResponse);
    return validatedResponse.variations;
    
  } catch (error) {
    console.error('Erro no refinamento:', error);
    throw new Error('Erro ao refinar copy. Tente novamente.');
  }
};

// Função legacy para compatibilidade
export const generateCopyWithGemini = async (
  _request: GeminiRequest
): Promise<GeminiResponse> => {
  // Implementação legacy mantida para compatibilidade
  const sections = await generateSectionCopyWithGemini(_request, 'HERO');
  
    return {
      variations: sections
    };
};

// Função para validar a API key
export const validateGeminiAPIKey = async (apiKey: string): Promise<boolean> => {
  try {
    const tempGenAI = new GoogleGenerativeAI(apiKey);
    const model = tempGenAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    // Fazer uma requisição de teste simples
    const result = await model.generateContent("Teste");
    await result.response;
    
    return true;
  } catch (error) {
    return false;
  }
};