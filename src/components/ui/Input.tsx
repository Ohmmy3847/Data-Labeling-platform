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
            className="block text-lg font-medium text-gray-700 mb-3"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={clsx(
            'flex w-full rounded-2xl border bg-white transition-all duration-200',
            'focus:outline-none focus:ring-4 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'placeholder:text-gray-400',
            
            // Size variants - larger for elderly users
            {
              'px-3 py-2 text-sm min-h-[40px]': size === 'sm',
              'px-4 py-3 text-base min-h-[48px]': size === 'md',
              'px-5 py-4 text-lg min-h-[56px]': size === 'lg',
              'px-6 py-5 text-xl min-h-[64px]': size === 'xl',
            },
            
            // Border and focus states with warm colors
            {
              'border-gray-300 focus:border-purple-500 focus:ring-purple-500/20': !error,
              'border-red-300 focus:border-red-500 focus:ring-red-500/20': error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {helpText && !error && (
          <p className="mt-2 text-sm text-slate-500">{helpText}</p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
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