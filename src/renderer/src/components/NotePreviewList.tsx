import React, { ComponentProps } from 'react'
import { notesMock } from '@/store/mocks'
import NotePreview from '@/components/NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@/hooks/useNotesList'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void;
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect });

  if(notes.length === 0) {
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
      {notes.map((note, index) => (
        <NotePreview 
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={() => handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}

export default NotePreviewList
