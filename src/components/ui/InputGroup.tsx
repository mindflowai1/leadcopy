import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  required = false,
  error,
  helpText,
  children
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-text"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
      {error && (
        <p className="text-sm text-red-500" role="alert">{error}</p>
      )}
    </div>
  );
};

export default InputGroup;




