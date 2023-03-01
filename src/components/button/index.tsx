import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const buttonStyles = cva('font-semibold focus:ring-4 focus-visible:ring-4 focus-visible:outline-none focus:outline-none flex gap-2 items-center justify-center rounded transition-colors', {
  variants: {
    intent: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-600/50 focus-visible:ring-primary-600/50',
      secondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-600/50 focus-visible:ring-gray-600/50',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-600/50 focus-visible:ring-red-600/50',
      success: 'text-white hover:bg-emerald-600 focus:ring-emerald-600/50 focus-visible:ring-emerald-600/50',
      info: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-600/50 focus-visible:ring-teal-600/50',
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
      large: ['text-lg', 'py-2', 'px-4'],
    },
    fullWidth: {
      true: 'w-full',
			false: 'w-fit'
    },
    outline: {
      true: 'border bg-transparent',
      false: 'border-0'
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none'
    }
  },
  compoundVariants: [
    {
      intent: 'danger',
      outline: true,
      className: 'hover:bg-red-500/30 border-red-500 text-red-500'
    },
    {
      intent: 'success',
      outline: true,
      className: 'hover:bg-emerald-500/30 border-emerald-500 text-emerald-500'
    },
    {
      intent: 'success',
      outline: false,
      className: 'bg-emerald-500'
    },
    {
      intent: 'info',
      outline: true,
      className: 'hover:bg-teal-500/30 border-teal-500 text-teal-500'
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
		fullWidth: false,
    outline: false
  }
})
export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
      disabled?: boolean
    }

const Button = ({ intent, size, fullWidth, children, outline, disabled, className, ...props }: ButtonProps) => {
  return (
    <button className={`${className} ${buttonStyles({ intent, size, fullWidth, outline, disabled })}`} {...props}>
      {children}
    </button>
  )
}

export default Button
