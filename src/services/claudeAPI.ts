// Exemplo de integração com API Claude
// Este arquivo demonstra como integrar com a API real do Claude

interface ClaudeAPIRequest {
  prompt: string;
  voiceTone: string;
  platform: string;
  length: string;
  keywords: string[];
}

interface ClaudeAPIResponse {
  results: Array<{
    id: string;
    content: string;
    timestamp: string;
  }>;
}

// Função para integrar com a API real do Claude
export const generateCopyWithClaude = async (
  request: ClaudeAPIRequest
): Promise<ClaudeAPIResponse> => {
  const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key do Claude não configurada');
  }

  // Construir o prompt para o Claude
  const systemPrompt = `Você é um especialista em copywriting. Gere ${request.length === 'short' ? 'copy curto' : request.length === 'medium' ? 'copy médio' : 'copy longo'} com tom ${request.voiceTone} para ${request.platform}.`;
  
  const userPrompt = `${request.prompt}${request.keywords.length > 0 ? `\n\nPalavras-chave a incluir: ${request.keywords.join(', ')}` : ''}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    
    // Processar resposta e gerar múltiplos resultados
    const results = [
      {
        id: 'result-1',
        content: data.content[0].text,
        timestamp: new Date().toISOString()
      },
      {
        id: 'result-2', 
        content: data.content[0].text + '\n\n[Variação alternativa do copy]',
        timestamp: new Date().toISOString()
      },
      {
        id: 'result-3',
        content: data.content[0].text + '\n\n[Outra variação criativa]',
        timestamp: new Date().toISOString()
      }
    ];

    return { results };
    
  } catch (error) {
    console.error('Erro ao chamar API do Claude:', error);
    throw error;
  }
};

// Exemplo de uso no componente App.tsx:
/*
import { generateCopyWithClaude } from './services/claudeAPI';

const handleGenerate = async () => {
  if (!prompt.trim()) return;
  
  setIsLoading(true);
  
  try {
    const response = await generateCopyWithClaude({
      prompt,
      voiceTone,
      platform,
      length,
      keywords
    });
    
    const newResults = response.results.map(result => ({
      ...result,
      timestamp: new Date(result.timestamp)
    }));
    
    setResults(newResults);
    setHistory(prev => [...newResults, ...prev].slice(0, 20));
    
  } catch (error) {
    console.error('Erro ao gerar copy:', error);
    // Mostrar toast de erro para o usuário
  } finally {
    setIsLoading(false);
  }
};
*/




