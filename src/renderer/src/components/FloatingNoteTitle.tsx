import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge';

export const FloatingNoteTitle = ({className, ...props}: ComponentProps<'div'>) => {
  const title = 'Note title';

  return (
    <div 
      className={twMerge('flex justify-items-center', className)}
      {...props}
    >
      <span className='text-gray-400'>{title}</span>
    </div>
  )
}

export default FloatingNoteTitle
