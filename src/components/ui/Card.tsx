import { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  variant?: 'default' | 'elevated' | 'soft' | 'gradient'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, padding = 'md', hover = false, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-3xl border transition-all duration-200',
          {
            'p-3': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
            'p-10': padding === 'xl',
          },
          {
            'bg-white border-gray-300 shadow-md border-2': variant === 'default',
            'bg-white border-gray-300 shadow-xl border-2': variant === 'elevated',
            'bg-gray-50 border-gray-200 shadow-sm border-2': variant === 'soft',
            'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 border-2': variant === 'gradient',
          },
          {
            'hover:shadow-xl hover:scale-105 cursor-pointer': hover,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={clsx('mb-6 pb-4', className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function CardTitle({ children, className, size = 'md' }: CardTitleProps) {
  return (
    <h3
      className={clsx(
        'font-semibold text-green-800 leading-tight',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
          'text-3xl': size === 'xl',
        },
        className
      )}
    >
      {children}
    </h3>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={clsx('text-gray-600 leading-relaxed mt-2', className)}>
      {children}
    </p>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={clsx('text-gray-700', className)}>{children}</div>
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={clsx('mt-6 pt-4 flex items-center', className)}>
      {children}
    </div>
  )
}