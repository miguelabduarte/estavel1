const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Função para criar a janela da aplicação
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Adicione o caminho para o preload.js
      nodeIntegration: false,  // Melhor prática de segurança, desative o nodeIntegration
      contextIsolation: true,  // Ative o contextIsolation
    },
  });

  win.loadURL('http://localhost:3000'); // URL do servidor de desenvolvimento do React
}

// Inicializa a aplicação Electron
app.whenReady().then(createWindow);

// Gerencia o ciclo de vida da aplicação
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Funções para salvar e carregar contactos
function saveContacts(contacts) {
    const data = JSON.stringify(contacts, null, 2);
    const filePath = path.join(__dirname, 'contacts.json');
    fs.writeFileSync(filePath, data, 'utf-8');
}

function loadContacts() {
  const filePath = path.join(__dirname, 'contacts.json');
  if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
  }
  return [];
}

// Comunicação IPC entre Electron e React
ipcMain.on('load-contacts', (event) => {
    const contacts = loadContacts();
    event.returnValue = contacts;
});

ipcMain.on('save-contacts', (event, contacts) => {
    saveContacts(contacts);
});
