import React from 'react';

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
  variant?: 'text' | 'card' | 'button';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  lines = 3,
  className = '',
  variant = 'text'
}) => {
  if (variant === 'card') {
    return (
      <div className={`animate-pulse bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="space-y-2 mb-4">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={`h-4 bg-gray-200 rounded ${
                index === lines - 1 ? 'w-3/4' : 'w-full'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
