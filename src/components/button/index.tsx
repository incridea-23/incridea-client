import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const buttonStyles = cva('font-semibold border rounded transition-colors', {
  variants: {
    intent: {
      primary: 'bg-primary-500 text-white border-transparent hover:bg-primary-600',
      secondary: 'bg-transparent text-secondary-800 border-secondary-600 hover:bg-secondary-200',
      danger: 'bg-red-500 text-white border-transparent hover:bg-red-600'
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4']
    },
    fullWidth: {
      true: 'w-full',
			false: 'w-fit'
    }
  },
  compoundVariants: [
    {
      intent: 'primary',
      size: 'medium',
      className: 'uppercase'
    }
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

const Button = ({ intent, size, fullWidth, children, className, ...props }: Props) => {
  return (
    <button className={`${className} ${buttonStyles({ intent, size, fullWidth })}`} {...props}>
      {children}
    </button>
  )
}

export default Button
