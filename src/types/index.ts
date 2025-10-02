// Tipos principais da aplicação

export interface CopyResult {
  id: string;
  content: string;
  timestamp: Date;
}

export interface GenerationConfig {
  prompt: string;
  voiceTone: string;
  platform: string;
  length: string;
  keywords: string[];
}

export interface VoiceToneOption {
  value: string;
  label: string;
}

export interface PlatformOption {
  value: string;
  label: string;
}

export interface LengthOption {
  value: string;
  label: string;
}

// Constantes para as opções
export const VOICE_TONE_OPTIONS: VoiceToneOption[] = [
  { value: 'professional', label: 'Profissional' },
  { value: 'casual', label: 'Casual' },
  { value: 'persuasive', label: 'Persuasivo' },
  { value: 'funny', label: 'Engraçado' },
  { value: 'inspirational', label: 'Inspirador' },
  { value: 'friendly', label: 'Amigável' },
  { value: 'authoritative', label: 'Autoritário' }
];

export const PLATFORM_OPTIONS: PlatformOption[] = [
  { value: 'instagram', label: 'Instagram Caption' },
  { value: 'blog', label: 'Blog Post' },
  { value: 'website', label: 'Título de Site' },
  { value: 'email', label: 'E-mail Marketing' },
  { value: 'product', label: 'Descrição de Produto' },
  { value: 'ad', label: 'Anúncio Publicitário' },
  { value: 'social', label: 'Post em Rede Social' },
  { value: 'landing', label: 'Landing Page' }
];

export const LENGTH_OPTIONS: LengthOption[] = [
  { value: 'short', label: 'Curto (até 50 palavras)' },
  { value: 'medium', label: 'Médio (50-150 palavras)' },
  { value: 'long', label: 'Longo (150+ palavras)' }
];




