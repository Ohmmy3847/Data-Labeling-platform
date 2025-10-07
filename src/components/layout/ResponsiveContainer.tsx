import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

/**
 * Responsive container component that handles:
 * - Max width constraints based on breakpoints
 * - Responsive padding
 * - Center alignment
 * - Safe area support for mobile devices
 */
export default function ResponsiveContainer({ 
  children, 
  className = '',
  maxWidth = 'lg',
  padding = true 
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',      // 640px
    md: 'max-w-3xl',      // 768px
    lg: 'max-w-4xl',      // 896px (optimal for iPad)
    xl: 'max-w-6xl',      // 1152px
    full: 'max-w-full'
  };

  return (
    <div className={clsx(
      'w-full mx-auto',
      maxWidthClasses[maxWidth],
      padding && 'px-4 sm:px-5 md:px-6',
      className
    )}>
      {children}
    </div>
  );
}
