import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helpText, size = 'md', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-fluid-base sm:text-fluid-lg font-medium text-gray-700 mb-2 sm:mb-3"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={clsx(
            'flex w-full rounded-2xl border bg-white transition-all duration-200 touch-target',
            'focus:outline-none focus:ring-4 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'placeholder:text-gray-400',
            
            // Size variants - responsive and larger for elderly users
            {
              'px-3 sm:px-4 py-2 sm:py-2.5 text-fluid-sm min-h-[48px] sm:min-h-[48px]': size === 'sm',
              'px-4 sm:px-5 py-3 sm:py-3.5 text-fluid-base min-h-[52px] sm:min-h-[56px]': size === 'md',
              'px-5 sm:px-6 py-4 sm:py-4.5 text-fluid-lg min-h-[56px] sm:min-h-[60px]': size === 'lg',
              'px-6 sm:px-7 py-5 sm:py-5.5 text-fluid-xl min-h-[60px] sm:min-h-[64px]': size === 'xl',
            },
            
            // Border and focus states with warm colors
            {
              'border-gray-300 focus:border-green-600 focus:ring-green-300': !error,
              'border-red-300 focus:border-red-500 focus:ring-red-500/20': error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {helpText && !error && (
          <p className="mt-2 text-fluid-xs sm:text-fluid-sm text-slate-500">{helpText}</p>
        )}
        {error && (
          <p className="mt-2 text-fluid-xs sm:text-fluid-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export default Input
export type { InputProps }