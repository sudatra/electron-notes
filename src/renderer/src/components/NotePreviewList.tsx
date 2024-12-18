import React, { ComponentProps } from 'react'
import { notesMock } from '@/store/mocks'

export const NotePreviewList = ({ ...props }: ComponentProps<'ul'>) => {
  return (
    <ul {...props}>
      {notesMock.map((note) => (
        <li key={note.title}>{note.title}</li>
      ))}
    </ul>
  )
}

export default NotePreviewList
