const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const launch = require('./launchMinecraft');

let mainFrameWindows;

function createWindow () {
  mainFrameWindows = new BrowserWindow
  ({
    width: 1280,
    height: 720,
    title: "Urusium Launcher",
    icon: __dirname + './src/icons/icon.ico',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      preload: path.join(__dirname, 'src/scripts/renderer.js')
    },
  roundedCorners: false,
  frame: false,
  })

  mainFrameWindows.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (mainFrameWindows.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

launch();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('close-window', () => {
    app.quit();
});
  
ipcMain.on('minimize-window', () => {
    mainFrameWindows.minimize();
});
  
ipcMain.on('maximize-window', () => {
    if (mainFrameWindows.isMaximized()) {
      mainFrameWindows.unmaximize();
    } else {
      mainFrameWindows.maximize();
    }
});