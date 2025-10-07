import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ResponsivePageProps {
  children: ReactNode;
  className?: string;
  withBottomNav?: boolean;
}

/**
 * Responsive page wrapper with:
 * - Full height layout
 * - Bottom navigation spacing
 * - Proper background
 */
export default function ResponsivePage({ 
  children, 
  className = '',
  withBottomNav = true
}: ResponsivePageProps) {
  return (
    <div className={clsx(
      'min-h-screen bg-white',
      withBottomNav && 'pb-20 sm:pb-24 md:pb-28',
      className
    )}>
      {children}
    </div>
  );
}
