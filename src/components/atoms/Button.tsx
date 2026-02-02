
import { clsx } from 'clsx'

export default function Button({
  children,
  variant = 'default',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }) {
  return (
    <button
      className={clsx(
        'px-3 py-2 rounded-md text-sm font-medium transition',
        variant === 'default' && 'bg-black text-white hover:bg-gray-800',
        variant === 'outline' && 'border border-gray-300 hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
