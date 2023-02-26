import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const buttonStyles = cva('font-semibold rounded transition-colors', {
  variants: {
    intent: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-secondary-200 text-secondary-800 hover:bg-secondary-300',
      danger: 'border-red-500 bg-red-500 text-white'
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
    }
  },
  compoundVariants: [
    {
      intent: 'primary',
      size: 'medium',
      className: 'uppercase'
    },
    {
      intent: 'danger',
      outline: true,
      className: 'bg-transparent border-red-500 hover:bg-red-200 text-red-500'
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
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ intent, size, fullWidth, children, outline, className, ...props }: Props) => {
  return (
    <button className={`${className} ${buttonStyles({ intent, size, fullWidth, outline })}`} {...props}>
      {children}
    </button>
  )
}

export default Button
