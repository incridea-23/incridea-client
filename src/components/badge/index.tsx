import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const badgeStyles = cva(
  'text-xs border rounded-full py-1 justify-center px-2',
  {
    variants: {
      color: {
        primary: 'border-primary-500 text-primary-500',
        secondary: 'border-gray-700 text-gray-700',
        danger: 'border-red-500 text-red-500',
        success: 'border-green-500 text-green-500',
        info: 'border-teal-500 text-teal-500',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeStyles> {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ color, children, className }: BadgeProps) => {
  return (
    <span className={`${className} ${badgeStyles({ color })}`}>{children}</span>
  );
};

export default Badge;
