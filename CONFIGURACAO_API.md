# 🔧 Configuração da API Key do Gemini

## Problemas Corrigidos

### ✅ **Erro do `process.env`**
- Substituído `process.env.REACT_APP_GEMINI_API_KEY` por `import.meta.env.VITE_GEMINI_API_KEY`
- Agora funciona corretamente no Vite

### ✅ **Modelo Gemini Atualizado**
- Substituído `gemini-pro` por `gemini-1.5-flash`
- Modelo mais rápido e eficiente

## Como Configurar Sua API Key

### Opção 1: Via Interface (Recomendado)
1. Execute o projeto: `npm run dev`
2. Acesse `http://localhost:3003`
3. Clique em **"Configurar API"** no header
4. Cole sua API key: `AIzaSyABWaGn70HC5XGRwuXD3WoSQHyGnenNRMQ`
5. Clique em **"Validar"** e depois **"Salvar"**

### Opção 2: Via Arquivo .env
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione a linha:
   ```
   VITE_GEMINI_API_KEY=AIzaSyABWaGn70HC5XGRwuXD3WoSQHyGnenNRMQ
   ```
3. Reinicie o servidor: `npm run dev`

## Testando a Integração

1. **Configure a API key** usando uma das opções acima
2. **Preencha o prompt**: "Um post para Instagram sobre nosso novo produto de skincare"
3. **Configure as opções**:
   - Tom: Persuasivo
   - Plataforma: Instagram Caption
   - Tamanho: Médio
   - Palavras-chave: skincare, beleza, natural
4. **Clique em "Gerar Copy"**
5. **Aguarde 2-5 segundos** e veja os resultados!

## Modelos Disponíveis

O projeto agora usa `gemini-1.5-flash` que é:
- ✅ Mais rápido que o modelo anterior
- ✅ Mais eficiente em termos de custo
- ✅ Suporta contextos maiores
- ✅ Melhor para geração de texto

## Troubleshooting

Se ainda houver problemas:

1. **Verifique se a API key está correta**
2. **Confirme que tem créditos na conta Google AI**
3. **Teste a API key diretamente no Google AI Studio**
4. **Verifique se não há bloqueios de rede**

A integração agora deve funcionar perfeitamente! 🚀




