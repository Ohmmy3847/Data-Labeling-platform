import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ResponsiveHeaderProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  borderColor?: string;
}

/**
 * Responsive header component with:
 * - Sticky positioning
 * - Safe area support
 * - Consistent spacing
 * - High contrast border
 */
export default function ResponsiveHeader({ 
  children, 
  className = '',
  sticky = true,
  borderColor = 'border-green-600'
}: ResponsiveHeaderProps) {
  return (
    <header className={clsx(
      'bg-white shadow-lg px-4 py-4 sm:py-5 z-50 border-b-4',
      sticky && 'sticky top-0',
      borderColor,
      className
    )}>
      <div className="container-responsive max-w-4xl mx-auto">
        {children}
      </div>
    </header>
  );
}
