import React from 'react';
import InputGroup from './InputGroup';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helpText,
  className = '',
  id,
  ...props
}) => {
  const inputClasses = `w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none ${error ? 'border-red-500' : ''} ${className}`;
  
  const textarea = (
    <textarea
      id={id}
      className={inputClasses}
      {...props}
    />
  );
  
  if (label) {
    return (
      <InputGroup
        label={label}
        id={id || ''}
        error={error}
        helpText={helpText}
      >
        {textarea}
      </InputGroup>
    );
  }
  
  return textarea;
};

export default Textarea;




