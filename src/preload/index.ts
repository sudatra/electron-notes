import { contextBridge } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

if(!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled');
}

try {
  contextBridge.exposeInMainWorld('context', {

  })
}
catch(error) {
  console.error(error);
}
