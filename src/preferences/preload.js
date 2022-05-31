(async function() {
  const {contextBridge, ipcRenderer} = require('electron')
  const path = require('path')
  const Store = require('electron-store')

  const userData = await ipcRenderer.invoke("getPath:userData")
  const serialize = value => JSON.stringify(value, null, 2)
  const config = new Store({
    serialize,
    defaults: {
      "farm": true,
      "security_type": "friends",
      "secure_cookie": false,
      "cookieSecret":
        Array.from({length:4}, ()=>(Math.random()*10e17).toString(36)).join(""),
      "session_duration": 36500,
      "wikiDomains": {
        "localhost": {
          "id": path.join(userData, "owner.json")
        }
      }
    }
  })
  const owner = new Store({serialize, name: "owner"})
  contextBridge.exposeInMainWorld('owner', {
    getName() {return owner.get("name", "Author")},
    setName(value) {owner.set("name", value)},
    getPassword() {return owner.get("friend.secret")},
    setPassword(value) {
      owner.set("friend.secret", value)
      config.set("admin", value)
    }
  })
})()
