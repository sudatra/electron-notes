import React from 'react'
import { ActionButton, ActionButtonProps } from '@/components'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useSetAtom } from 'jotai';
import { deleteNoteAtom } from '@/store';

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteEmptyNote = useSetAtom(deleteNoteAtom);
  
  const handleNoteDeletion = async () => {
    await deleteEmptyNote();
  }

  return (
    <ActionButton onClick={handleNoteDeletion} {...props}>
      <FaRegTrashCan className='w-4 h-4 text-zinc-300' />
    </ActionButton>
  )
}

export default DeleteNoteButton
