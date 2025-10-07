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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm';
  
const variants = {
  primary: 'bg-green-700 text-white hover:bg-green-800 border-2 border-green-800 shadow-lg font-bold',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 border-2 border-gray-400 font-bold',
  outline: 'border-2 border-green-700 text-green-800 hover:bg-green-50 font-bold',
  ghost: 'text-green-800 hover:bg-green-100 font-bold',
  destructive: 'bg-red-600 text-white hover:bg-red-700 border-2 border-red-700 shadow-lg font-bold'
};  const sizeClasses = {
    sm: 'px-4 py-3 text-base min-h-[44px]',
    md: 'px-6 py-4 text-lg min-h-[52px]',
    lg: 'px-8 py-5 text-xl min-h-[60px]',
    xl: 'px-10 py-6 text-2xl min-h-[68px]'
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
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
          กำลังโหลด...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;