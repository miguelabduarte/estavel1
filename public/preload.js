const { contextBridge, ipcRenderer } = require('electron');

// Expor o ipcRenderer para a janela do frontend
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        sendSync: (channel, data) => ipcRenderer.sendSync(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    }
});
