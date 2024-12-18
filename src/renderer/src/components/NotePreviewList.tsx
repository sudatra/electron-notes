import React, { ComponentProps } from 'react'
import { notesMock } from '@/store/mocks'
import NotePreview from './NotePreview'
import { twMerge } from 'tailwind-merge'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if(notesMock.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)}>
        <span>No Notes Yet!!!</span>
      </ul>
    )
  }

  return (
    <ul 
      {...props}
      className={className}
    >
      {notesMock.map((note) => (
        <NotePreview 
          key={note.title + note.lastEditTime}
          {...note}
        />
      ))}
    </ul>
  )
}

export default NotePreviewList
