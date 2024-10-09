const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let db;

// Função para criar a janela da aplicação
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:3000'); // URL do servidor de desenvolvimento do React
}

// Função para configurar a base de dados SQLite
function setupDatabase() {
  const dbPath = path.resolve(__dirname, 'clientes.db'); // Caminho do arquivo da base de dados
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
      console.log('Conectado ao SQLite');
    }
  });

  // Cria a tabela 'clientes' se ela não existir
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        telemovel TEXT,
        email TEXT
      )
    `);
  });
}

// Função para obter os clientes da base de dados
function getClientes(callback) {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) {
      console.error('Erro ao buscar os clientes:', err.message);
      callback([]);
    } else {
      callback(rows);
    }
  });
}

// IPC para responder às requisições do frontend
ipcMain.handle('get-clientes', async () => {
  return new Promise((resolve) => {
    getClientes((data) => {
      resolve(data);
    });
  });
});

// Inicializa a aplicação Electron
app.whenReady().then(() => {
  createWindow();
  setupDatabase();
});

// Fecha a base de dados quando a aplicação é encerrada
app.on('window-all-closed', () => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar a base de dados:', err.message);
      }
      console.log('Base de dados SQLite fechada.');
    });
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
