import React from 'react';
import InputGroup from './InputGroup';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helpText,
  options,
  placeholder,
  className = '',
  id,
  ...props
}) => {
  const selectClasses = `w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${error ? 'border-red-500' : ''} ${className}`;
  
  const select = (
    <select
      id={id}
      className={selectClasses}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
  
  if (label) {
    return (
      <InputGroup
        label={label}
        id={id || ''}
        error={error}
        helpText={helpText}
      >
        {select}
      </InputGroup>
    );
  }
  
  return select;
};

export default Select;




