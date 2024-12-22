import React from 'react'
import { ActionButton, ActionButtonProps } from '@/components'
import { LuSignature } from 'react-icons/lu'
import { useSetAtom } from 'jotai'
import { createEmptyNoteAtom } from '@/store'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom);

  const handleNoteCreation = () => {
    createEmptyNote();
  }

  return (
    <ActionButton onClick={handleNoteCreation} {...props}>
      <LuSignature className='w-4 h-4 text-zinc-300'/>
    </ActionButton>
  )
}

export default NewNoteButton
