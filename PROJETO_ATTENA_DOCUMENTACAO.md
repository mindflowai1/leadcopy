# 📋 Attena - Documentação Completa do Projeto

## 🎯 Visão Geral
**Attena** é um gerador de copy profissional usando IA avançada (Google Gemini Pro). O projeto foi desenvolvido com React, TypeScript, Tailwind CSS e integração com a API do Gemini para criar conteúdo persuasivo e eficaz.

---

## 🏗️ Arquitetura do Projeto

### **Stack Tecnológica:**
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v3
- **Ícones:** Lucide React
- **IA:** Google Gemini Pro API
- **Validação:** Zod
- **Font:** IBM Plex Sans

### **Estrutura de Pastas:**
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── ConfigPanel.tsx
│   │   ├── ResultsPanel.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── InputGroup.tsx
│       ├── ResultBox.tsx
│       ├── APISetup.tsx
│       ├── ErrorNotification.tsx
│       ├── LoadingAnimation.tsx
│       └── HistoryPanel.tsx
├── services/
│   └── geminiAPI.ts
├── schemas/
│   └── copySchemas.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🎨 Design System

### **Paleta de Cores:**
- **Teal Principal:** #14B8A6
- **Azul Escuro:** #1E3A8A
- **Gradientes:** Teal → Azul Escuro
- **Background:** #F8FAFC (cinza claro)
- **Texto:** #1E3A8A (azul escuro)

### **Tipografia:**
- **Fonte:** IBM Plex Sans (300-700)
- **Títulos:** text-2xl font-bold
- **Corpo:** text-base font-medium
- **Gradientes de texto:** from-teal-600 to-blue-600

### **Componentes Visuais:**
- **Cards:** Rounded-2xl com sombras
- **Botões:** Gradientes teal/azul
- **Animações:** fadeInUp, hover-lift, pulse
- **Glassmorphism:** backdrop-blur-sm

---

## 🚀 Funcionalidades Implementadas

### **1. Interface Principal**
- ✅ **Header:** Logo + botão de configuração
- ✅ **ConfigPanel:** Formulário de configuração
- ✅ **ResultsPanel:** Exibição de resultados
- ✅ **Footer:** Informações da empresa

### **2. Configuração de Copy**
- ✅ **Prompt principal:** Textarea para descrição
- ✅ **Tom de voz:** Dropdown com opções
- ✅ **Plataforma:** Instagram, Blog, Website, etc.
- ✅ **Tamanho:** Curto, Médio, Longo
- ✅ **Nível de criatividade:** Baixa, Média, Alta
- ✅ **Palavras-chave:** Input com sugestões inteligentes
- ✅ **Validação:** Campos obrigatórios

### **3. Geração de Copy**
- ✅ **Integração Gemini Pro:** API real
- ✅ **JSON estruturado:** Resposta validada com Zod
- ✅ **3 variações:** Por geração
- ✅ **Estratégias:** PAS, AIDA, BAB
- ✅ **Limites de caracteres:** Enforçados no prompt

### **4. Resultados Interativos**
- ✅ **Sistema minimizável:** Resultados fechados por padrão
- ✅ **Expansão individual:** Botão para cada resultado
- ✅ **Ações:** Copiar e Refinar
- ✅ **Histórico:** Últimas 20 gerações
- ✅ **Animações:** Transições suaves

### **5. Configuração de API**
- ✅ **Modal de setup:** Configuração da chave Gemini
- ✅ **Validação:** Teste de conexão
- ✅ **Armazenamento:** LocalStorage
- ✅ **Fallback:** Variável de ambiente

---

## 🎭 Animações e Transições

### **CSS Customizado:**
```css
/* Animações principais */
@keyframes fadeInUp { /* ... */ }
@keyframes fadeInLeft { /* ... */ }
@keyframes fadeInRight { /* ... */ }
@keyframes slideInDown { /* ... */ }
@keyframes float { /* ... */ }
@keyframes pulse { /* ... */ }

/* Classes utilitárias */
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
.hover-lift:hover { transform: translateY(-4px); }
.transition-all-smooth { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
```

### **Transições de Estado:**
- ✅ **Loading → Resultados:** Fade suave
- ✅ **Resultados aparecem:** fadeInUp escalonado
- ✅ **Hover effects:** Lift e glow
- ✅ **Botões:** Animações de shimmer

---

## 🔧 Configurações Técnicas

### **API Gemini:**
```typescript
// Configuração
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-pro" 
});

// Parâmetros
generationConfig: {
  temperature: creativityConfig.temperature,
  maxOutputTokens: 2048,
  responseMimeType: "application/json"
}
```

### **Schema Zod:**
```typescript
export const GeminiResponseSchema = z.object({
  titulo: z.string().max(80),
  opcoes_copy: z.array(z.object({
    variacao: z.string(),
    texto_curto: z.string().max(300),
    texto_longo: z.string().min(300),
    cta: z.string().min(5),
    tom_aplicado: z.string(),
    estrategia_usada: z.string()
  })).length(3)
});
```

### **Estados React:**
```typescript
const [prompt, setPrompt] = useState('');
const [voiceTone, setVoiceTone] = useState('');
const [platform, setPlatform] = useState('');
const [length, setLength] = useState('');
const [keywords, setKeywords] = useState<string[]>([]);
const [creativityLevel, setCreativityLevel] = useState<'low' | 'medium' | 'high'>('medium');
const [results, setResults] = useState<CopyResult[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [showResults, setShowResults] = useState(false);
const [expandedResults, setExpandedResults] = useState<Record<string, boolean>>({});
```

---

## 🎨 Logo e Branding

### **Logo Attena:**
- **Arquivo:** `/public/logo2.png`
- **Design:** Ícone "A" teal + texto "Attena" azul escuro
- **Tamanhos:**
  - Header: `h-12` (48px)
  - Footer: `h-12` (48px) com filtro branco
- **Fundo:** Transparente

### **CSS da Logo:**
```css
/* Logo transparente */
.logo-transparent {
  background: transparent !important;
  border: none !important;
  outline: none !important;
}

/* Logo branca no footer */
.footer-logo {
  filter: brightness(0) invert(1) !important;
}
```

---

## 📱 Responsividade

### **Breakpoints Tailwind:**
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### **Layout Adaptativo:**
- **Header:** Altura fixa, logo responsiva
- **ConfigPanel:** Grid responsivo
- **ResultsPanel:** Cards empilhados em mobile
- **Footer:** Grid adaptativo

---

## 🔐 Segurança e Validação

### **Validação Frontend:**
- ✅ **Campos obrigatórios:** Prompt, tom, plataforma, tamanho
- ✅ **Limites:** Máximo 10 palavras-chave
- ✅ **Sanitização:** Inputs limpos

### **Validação Backend (Gemini):**
- ✅ **Schema Zod:** Validação de resposta
- ✅ **Limites de caracteres:** Enforçados
- ✅ **Tratamento de erros:** Mensagens específicas

---

## 🚀 Comandos de Desenvolvimento

### **Desenvolvimento:**
```bash
npm run dev
# Servidor: http://localhost:3004/
```

### **Build:**
```bash
npm run build
# Gera pasta dist/ com arquivos otimizados
```

### **Lint:**
```bash
npm run lint
# Verifica erros de código
```

---

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.11.3",
    "lucide-react": "^0.378.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zod": "^3.23.8",
    "zod-to-json-schema": "^3.23.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
```

---

## 🎯 Próximos Passos (Para Amanhã)

### **Melhorias Planejadas:**
1. **🔍 Busca no Histórico:** Filtro por data/conteúdo
2. **📊 Analytics:** Métricas de uso
3. **🎨 Temas:** Modo escuro/claro
4. **📱 PWA:** Instalação como app
5. **🔄 Cache:** Armazenamento offline
6. **📈 Performance:** Otimizações adicionais
7. **🧪 Testes:** Unit e integration tests
8. **📚 Documentação:** README detalhado

### **Funcionalidades Avançadas:**
1. **🎭 Templates:** Modelos pré-definidos
2. **📋 Coleções:** Agrupamento de copies
3. **👥 Colaboração:** Compartilhamento
4. **📊 Relatórios:** Análise de performance
5. **🔗 Integrações:** APIs externas

---

## 🐛 Problemas Conhecidos

### **Resolvidos:**
- ✅ Logo PNG com fundo transparente
- ✅ Animações de transição suaves
- ✅ Sistema de resultados minimizáveis
- ✅ Validação de campos obrigatórios
- ✅ Filtro branco da logo no footer

### **Em Investigação:**
- 🔍 Otimização de performance em mobile
- 🔍 Melhoria na UX do loading
- 🔍 Cache de resultados

---

## 📞 Suporte e Contato

### **Desenvolvimento:**
- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS
- **IA:** Google Gemini Pro
- **Deploy:** Vite build

### **Arquivos Importantes:**
- **Configuração:** `package.json`
- **Build:** `vite.config.ts`
- **Estilos:** `src/index.css`
- **Tipos:** `src/schemas/copySchemas.ts`

---

## 🎉 Conquistas do Projeto

### **✅ Implementado com Sucesso:**
1. **Interface profissional** com design moderno
2. **Integração real** com Google Gemini Pro
3. **Sistema de validação** robusto
4. **Animações fluidas** e profissionais
5. **Responsividade** completa
6. **Sistema de resultados** interativo
7. **Histórico** de gerações
8. **Configuração de API** intuitiva
9. **Logo personalizada** com branding
10. **Transições suaves** entre estados

### **🚀 Pronto para Produção:**
- Build otimizado
- Código limpo e documentado
- Validação completa
- Tratamento de erros
- Performance otimizada

---

**📅 Data:** Dezembro 2024  
**👨‍💻 Status:** Desenvolvimento Ativo  
**🎯 Próxima Sessão:** Continuação das melhorias planejadas

---

*Este documento será atualizado conforme o desenvolvimento progride.*




