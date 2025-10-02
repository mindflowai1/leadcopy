import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  error?: string;
  helpText?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Digite uma palavra-chave e pressione Enter',
  maxTags = 10,
  error,
  helpText
}) => {
  const [inputValue, setInputValue] = useState('');
  
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag) && value.length < maxTags) {
      onChange([...value, trimmedTag]);
      setInputValue('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text">
          {label}
        </label>
      )}
      
      <div className="border border-gray-300 rounded-lg p-2 min-h-[42px] focus-within:ring-2 focus-within:ring-accent focus-within:border-transparent">
        <div className="flex flex-wrap gap-1 mb-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-accent/20 text-primary text-sm rounded-md"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-red-500"
                aria-label={`Remover ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        
        {value.length < maxTags && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={() => addTag(inputValue)}
            placeholder={placeholder}
            className="w-full border-none outline-none bg-transparent text-sm"
          />
        )}
      </div>
      
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
      {error && (
        <p className="text-sm text-red-500" role="alert">{error}</p>
      )}
      
      {value.length >= maxTags && (
        <p className="text-sm text-gray-500">
          Máximo de {maxTags} palavras-chave atingido
        </p>
      )}
    </div>
  );
};

export default TagInput;
