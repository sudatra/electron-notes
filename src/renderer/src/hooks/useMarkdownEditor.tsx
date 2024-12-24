import { saveNoteAtom, selectedNoteAtom } from "@/store"
import { MDXEditorMethods } from "@mdxeditor/editor";
import { NoteContent } from "@shared/models";
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react";
import { throttle } from 'lodash'
import { autoSaveTime } from "@shared/constants";

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleAutoSave = throttle(async (content: NoteContent) => {
    if(!selectedNote) {
      return;
    }

    console.log("Auto Saving: ", selectedNote.title);
    await saveNote(content);
  }, autoSaveTime, {
    leading: false,
    trailing: true
  });

  const handleBlur = async () => {
    if(!selectedNote) {
      return;
    }

    handleAutoSave.cancel();
    const content = editorRef.current?.getMarkdown();

    if(content != null) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSave,
    handleBlur
  }
}