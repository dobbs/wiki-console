const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const Store = require('electron-store');
Store.initRenderer();
app.on('ready', () => {
  ipcMain.handle('getPath:userData', () => app.getPath('userData'))
})

const preferences = {
  open() {
    let window = BrowserWindow.getAllWindows().find(W => W.title == "Preferences")
    if (window) {
      window.show()
      window.moveTop()
      return
    }
    window = new BrowserWindow({
      height: 300,
      width: 400,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
    })
    window.loadFile(path.join(__dirname, 'index.html'))
    //window.webContents.openDevTools()
  }
}

module.exports = preferences
