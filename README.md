# 🚀 Attena Copy - Gerador de Copy Profissional com IA

Uma ferramenta avançada para gerar copy profissional para landing pages usando inteligência artificial, inspirada nos princípios de David Ogilvy.

## ✨ Funcionalidades

- 🤖 **IA Avançada**: Integração com Google Gemini para geração de copy de alta qualidade
- 📄 **Upload de PDF**: Processamento de documentos para personalização profunda
- 🏗️ **Estrutura Modular**: Definição de seções específicas (Hero, Prova Social, Oferta, etc.)
- 🔄 **Fluxo Iterativo**: Aprovação seção por seção com refinamento baseado em feedback
- 🎨 **Interface Profissional**: Design moderno com transições suaves
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript + Tailwind CSS
- **IA**: Google Gemini API
- **Build**: Vite
- **Validação**: Zod
- **Ícones**: Lucide React

## 🚀 Deploy no GitHub Pages

### Pré-requisitos
- Node.js 18+
- Conta no GitHub
- Chave da API do Google Gemini

### Passos para Deploy

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/LeadCopy.git
cd LeadCopy
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure sua API Key**
- Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
- Crie uma nova API Key
- Cole a chave na aplicação quando solicitado

4. **Teste localmente**
```bash
npm run dev
```

5. **Deploy para GitHub Pages**
```bash
npm run deploy
```

### Configuração do GitHub Pages

1. Vá para **Settings** do seu repositório
2. Role até **Pages** na sidebar
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha **gh-pages** branch
5. Clique **Save**

Sua aplicação estará disponível em: `https://seu-usuario.github.io/LeadCopy/`

## 📖 Como Usar

1. **Configure a API**: Cole sua chave do Google Gemini
2. **Upload de PDF**: Faça upload de informações do cliente (opcional)
3. **Configure o Copy**: Defina prompt, tom de voz, plataforma, etc.
4. **Estrutura da Landing**: Defina as seções da sua landing page
5. **Gere e Aprove**: Gere variações e aprove seção por seção
6. **Refine**: Use feedback para melhorar o conteúdo
7. **Resultado Final**: Copie o conteúdo aprovado

## 🔧 Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Deploy para GitHub Pages
npm run deploy
```

## 📝 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/          # Componentes de layout
│   └── ui/              # Componentes de interface
├── services/            # Serviços (API, PDF)
├── schemas/             # Validação com Zod
├── types/               # Tipos TypeScript
└── App.tsx             # Componente principal
```

## 🎯 Tipos de Seção Suportados

- **Hero**: Seção principal com impacto máximo
- **Prova Social**: Credibilidade e resultados
- **Oferta**: Conversão e urgência
- **Depoimentos**: Confiança e transformações
- **FAQ**: Objeções e clareza
- **Custom**: Seções personalizadas

## 🔒 Segurança

- API Keys são armazenadas apenas no localStorage do navegador
- Nenhum dado é enviado para servidores externos além da API do Gemini
- Processamento de PDF é feito localmente no navegador

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no GitHub.

---

**Attena Copy** - Transformando ideias em copy que converte! 🎯