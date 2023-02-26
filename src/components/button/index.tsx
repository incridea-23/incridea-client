import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const buttonStyles = cva('font-semibold flex gap-2 items-center justify-center rounded transition-colors', {
  variants: {
    intent: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4']
    },
    fullWidth: {
      true: 'w-full',
			false: 'w-fit'
    },
    outline: {
      true: 'border',
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
      className: 'bg-transparent hover:bg-transparent transition-all duration-75 border-red-500 text-red-500'
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
		fullWidth: false
  }
})
export interface Props
  extends VariantProps<typeof buttonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
      disabled?: boolean
    }

const Button = ({ intent, size, fullWidth, children, outline, disabled, className, ...props }: Props) => {
  return (
    <button className={`${className} ${buttonStyles({ intent, size, fullWidth, outline, disabled })}`} {...props}>
      {children}
    </button>
  )
}

export default Button
