import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  color?: 'default' | 'accent' | 'success' | 'warning';
  className?: string;
  label?: string;
  showStatus?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'md',
  showValue = true,
  color = 'default',
  className,
  label,
  showStatus = false,
}) => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    default: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-md',
  };
  
  const getStatusText = () => {
    if (value === 0) return "Not Started";
    if (value === 100) return "Completed";
    return "In Progress";
  };
  
  const getStatusColor = () => {
    if (value === 0) return "text-gray-500";
    if (value === 100) return "text-green-600";
    return "text-amber-600";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        {label && <div className="text-xs font-medium text-gray-600">{label}</div>}
        <div className="flex gap-2 items-center ml-auto">
          {showStatus && (
            <div className={cn("text-xs font-medium", getStatusColor())}>{getStatusText()}</div>
          )}
          {showValue && (
            <div className="text-xs font-medium text-gray-500">{Math.round(value)}% Complete</div>
          )}
        </div>
      </div>
      <div className={cn("w-full bg-gray-200 overflow-hidden", sizeClasses[size], roundedClasses[size])}>
        <div
          className={cn(
            "transition-all ease-apple duration-1000 animate-progress-fill", 
            colorClasses[color], 
            roundedClasses[size]
          )}
          style={{ 
            width: `${value}%`,
            '--progress-width': `${value}%`
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};
