const {contextBridge} = require('electron')
const Store = require('electron-store')

const owner = new Store({
  name: "owner",
  serialize: value => JSON.stringify(value, null, 2)
})

contextBridge.exposeInMainWorld('owner', {
  getName() {return owner.get("name", "Author")},
  setName(value) {owner.set("name", value)},
  getPassword() {return owner.get("friend.secret")},
  setPassword(value) {owner.set("friend.secret", value)}
})
