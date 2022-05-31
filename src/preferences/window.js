const {BrowserWindow} = require('electron')
const path = require('path')
const preferences = {
  open() {
    let window = BrowserWindow.getAllWindows().find(W => W.title == "Preferences")
    if (window) {
      console.log("already have Preferences window")
      window.show()
      window.moveTop()
      return
    }
    window = new BrowserWindow({
      height: 300,
      width: 900,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
    })
    window.loadFile(path.join(__dirname, 'index.html'))
    window.webContents.openDevTools()
  }
}

module.exports = preferences
