import { appDirectoryName, fileEncoding } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { CreateNote, GetNotes, ReadNote, WriteNote } from "@shared/types"
import { dialog } from "electron"
import { ensureDir, readdir, readFile, stat, writeFile } from "fs-extra"
import { homedir } from "os"
import path from "path"

export const getRootDir = () => {
  return `${homedir()}\\Desktop\\Electron\\notes\\${appDirectoryName}`
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
    `${rootDir}\\${filename}.md`,
    { encoding: fileEncoding }
  )
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir();
  console.log(`Writing note ${filename}`);

  return writeFile(
    `${rootDir}\\${filename}.md`,
    content,
    { encoding: fileEncoding }
  )
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir();
  await ensureDir(rootDir);

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}\\Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [
      { name: 'Markdown', extensions: ['md'] }
    ]
  });

  if(canceled || !filePath) {
    console.info("Note Creation Cancelled")
    return false;
  }

  const { name: filename, dir: parentDir } = path.parse(filePath);

  if(parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation of Note failed',
      message: `All notes must be saved under ${rootDir} --- Avoid using other directories!`
    })

    return false;
  }

  console.info(`Creating Note: ${filePath}`);
  await writeFile(filePath, '');

  return filename;
}