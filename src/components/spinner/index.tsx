import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { cva, VariantProps } from 'class-variance-authority'

const spinnerStyles = cva('flex h-full w-full items-center justify-center mx-auto my-auto', {
  variants: {
    size: {
      small: 'text-2xl',
      medium: 'text-4xl ',
      large: 'text-6xl'
    },
    intent: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      black: 'text-black',
      white: 'text-white'
    }
  },
  defaultVariants: {
    size: 'medium',
    intent: 'primary'
  }
})

export interface Props extends VariantProps<typeof spinnerStyles> { className?: string}

const Spinner = ({ size, intent, className }: Props) => {
  return (
    <div className={`${className} ${spinnerStyles({ size, intent })}`}>
      <BiLoaderAlt className='animate-spin'  />
    </div>
  )
}

export default Spinner
