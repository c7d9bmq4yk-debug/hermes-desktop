const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow = null;

const __dirname = path.dirname(__filename);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Hermes Agent',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: true,
    show: false,
  });

  let startURL;
  if (isDev) {
    startURL = 'http://localhost:5173';
  } else {
    const indexPath = path.join(__dirname, '../../dist/src/renderer/index.html');
    startURL = `file://${indexPath}`;
  }

  console.log('__dirname:', __dirname);
  console.log('Loading:', startURL);

  mainWindow.loadURL(startURL);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.show();
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
    const errorWindow = new BrowserWindow({ width: 600, height: 400 });
    errorWindow.loadURL(`data:text/html,<html><body><h1>Failed to load</h1><p>__dirname: ${__dirname}</p><p>URL: ${startURL}</p><p>Error: ${errorDescription}</p></body></html>`);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();
  
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});
