import { appDirectoryName, fileEncoding } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { GetNotes, ReadNote } from "@shared/types"
import { ensureDir, readdir, readFile, stat } from "fs-extra"
import { homedir } from "os"

export const getRootDir = () => {
  return `${homedir()}/Desktop/Electron/notes/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir();
  await ensureDir(rootDir);

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'));
  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`);

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename: string) => {
  const rootDir = getRootDir();
  return readFile(
    `${rootDir}/${filename}.md`,
    { encoding: fileEncoding }
  )
}