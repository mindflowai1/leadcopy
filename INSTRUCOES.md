# 🚀 LeadCopy Generator - Instruções de Execução

## Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

## Passos para Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar em Modo Desenvolvimento
```bash
npm run dev
```

O projeto será aberto automaticamente em `http://localhost:3000`

### 3. Build para Produção
```bash
npm run build
```

### 4. Preview da Build
```bash
npm run preview
```

## 🎯 Funcionalidades Implementadas

### ✅ Interface Completa
- **Header** com logo e navegação
- **Split-view** responsivo (desktop) / empilhado (mobile)
- **Painel de Configurações** com todos os campos solicitados
- **Painel de Resultados** com múltiplas opções

### ✅ Componentes Modulares
- `Button` - Botão reutilizável com variantes
- `InputGroup` - Grupo de input com label e validação
- `Textarea` - Textarea com estilização consistente
- `Select` - Select dropdown estilizado
- `TagInput` - Input para palavras-chave
- `ResultBox` - Caixa de resultado com ações
- `LoadingSkeleton` - Esqueleto de carregamento
- `HistoryPanel` - Painel de histórico

### ✅ Design System
- **Paleta de Cores**: Azul Marinho (#0A192F) + Ciano Vibrante (#64FFDA)
- **Tipografia**: Inter (Google Fonts)
- **Responsividade**: Mobile-first com breakpoints otimizados
- **Acessibilidade**: ARIA labels, semântica HTML, foco visível

### ✅ Funcionalidades
- **Geração Simulada**: Simula chamada para API Claude
- **Múltiplos Resultados**: 3 opções por geração
- **Sistema de Cópia**: Copiar para clipboard com feedback
- **Refinamento**: Reutilizar resultado como novo prompt
- **Histórico**: Últimas 20 gerações salvas
- **Validação**: Campos obrigatórios e limites

### ✅ Integração Preparada
- Arquivo `src/services/claudeAPI.ts` com exemplo de integração real
- Comentários indicando onde integrar com API real
- Estrutura de tipos TypeScript para API

## 🔧 Personalização

### Cores
Edite `tailwind.config.js` para alterar a paleta:
```javascript
colors: {
  primary: '#0A192F',    // Azul Marinho
  accent: '#64FFDA',     // Ciano Vibrante
  background: '#F8FAFC', // Fundo
  text: '#333333'        // Texto
}
```

### Opções de Configuração
Edite `src/types/index.ts` para adicionar/remover opções:
- `VOICE_TONE_OPTIONS` - Tons de voz
- `PLATFORM_OPTIONS` - Plataformas
- `LENGTH_OPTIONS` - Tamanhos

## 🌐 Integração com Claude API

Para integrar com a API real do Claude:

1. Configure a variável de ambiente:
```bash
REACT_APP_CLAUDE_API_KEY=sua_api_key_aqui
```

2. Substitua a função `simulateClaudeAPI` em `App.tsx` pela função `generateCopyWithClaude` de `src/services/claudeAPI.ts`

3. Ajuste os parâmetros da API conforme necessário

## 📱 Responsividade

- **Mobile**: Layout empilhado, navegação simplificada
- **Tablet**: Layout híbrido com ajustes de espaçamento
- **Desktop**: Split-view completo com painéis lado a lado

## ♿ Acessibilidade

- Labels associados a inputs
- ARIA attributes para elementos interativos
- Navegação por teclado
- Contraste adequado
- Texto alternativo para ícones

## 🎨 Customização Visual

O design segue os princípios solicitados:
- **Clean e Minimalista**: Foco no conteúdo
- **Profissional**: Paleta de cores corporativa
- **Moderno**: Tipografia e espaçamentos contemporâneos
- **Funcional**: Interface intuitiva e eficiente




