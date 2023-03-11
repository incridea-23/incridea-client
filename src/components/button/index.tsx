import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonStyles = cva(
  'font-semibold flex gap-2 items-center justify-center rounded transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        info: 'bg-teal-500 text-white hover:bg-teal-600',
        dark: 'bg-gray-900/60 text-white hover:bg-opacity-30',
        ghost:
          'bg-transparent text-gray-700 border border-gray-400 hover:border-gray-700',
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4'],
        large: ['text-lg', 'py-2', 'px-4'],
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      outline: {
        true: 'border bg-transparent',
        false: 'border-0',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    compoundVariants: [
      {
        intent: 'danger',
        outline: true,
        className: 'hover:bg-red-500/30 border-red-500 text-red-500',
      },
      {
        intent: 'success',
        outline: true,
        className: 'hover:bg-green-500/30 border-green-500 text-green-500',
      },
      {
        intent: 'info',
        outline: true,
        className: 'hover:bg-teal-500/30 border-teal-500 text-teal-500',
      },
      {},
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);
export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const Button = ({
  intent,
  size,
  fullWidth,
  children,
  outline,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${buttonStyles({
        intent,
        size,
        fullWidth,
        outline,
        disabled,
      })}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
