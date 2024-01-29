import { cva, VariantProps } from 'class-variance-authority';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

const buttonStyles = cva(
  `flex gap-2 items-center justify-center rounded transition-colors duration-300 titleFont`,
  {
    variants: {
      intent: {
        primary:
          'bg-gradient-to-br from-[#e95c71] via-[#dd5c6e] to-[#bb384c]  text-white ',
        secondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        info: 'bg-teal-500 text-white hover:bg-teal-600',
        dark: 'bg-gray-900/60 text-white hover:bg-opacity-30',
        ghost: 'bg-transparent border-[#e95c71] border text-[#f3556a] ',
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-sm md:text-base', 'py-1 md:py-2', 'px-2 md:px-4'],
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
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends Omit<
      HTMLMotionProps<'button'>,
      'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style'
    >,
    VariantProps<typeof buttonStyles> {
  disabled?: boolean;
  style?: React.CSSProperties & { [key: string]: any };
  noScaleOnHover?: boolean;
}

const Button = ({
  intent,
  size,
  fullWidth,
  children,
  outline,
  disabled,
  className,
  noScaleOnHover,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={noScaleOnHover ? { scale: 1 } : { scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
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
    </motion.button>
  );
};

export default Button;
