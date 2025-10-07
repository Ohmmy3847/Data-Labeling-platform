import React from 'react';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'touch-target inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95';
  
const variants = {
  primary: 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900 border-2 border-green-800 shadow-lg font-bold focus:ring-green-300',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 border-2 border-gray-400 font-bold focus:ring-gray-300',
  outline: 'border-2 border-green-700 text-green-800 hover:bg-green-50 active:bg-green-100 font-bold focus:ring-green-300',
  ghost: 'text-green-800 hover:bg-green-100 active:bg-green-200 font-bold focus:ring-green-300',
  destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-2 border-red-700 shadow-lg font-bold focus:ring-red-300'
};

  // Responsive sizing with fluid typography and touch-friendly targets
  const sizeClasses = {
    sm: 'px-4 sm:px-5 py-3 sm:py-3.5 text-fluid-sm min-h-[48px] sm:min-h-[48px]',
    md: 'px-5 sm:px-6 md:px-7 py-3.5 sm:py-4 md:py-4.5 text-fluid-base min-h-[52px] sm:min-h-[56px]',
    lg: 'px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-5.5 text-fluid-lg min-h-[56px] sm:min-h-[60px] md:min-h-[64px]',
    xl: 'px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 text-fluid-xl min-h-[60px] sm:min-h-[64px] md:min-h-[68px]'
  };
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`.trim();
  
  return (
    <button 
      className={classes} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
          <span className="text-fluid-base">กำลังโหลด...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;