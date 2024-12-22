import { GetNotes } from '@shared/types';
import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

if(!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled');
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args)
  })
}
catch(error) {
  console.error(error);
}
