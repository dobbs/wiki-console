const {contextBridge} = require('electron')
const Store = require('electron-store')
const {config, owner, serialize} = require('../config.js')
const configStore = new Store({
  serialize,
  name: "config"
})
const ownerStore = new Store({
  serialize,
  name: "owner"
})

contextBridge.exposeInMainWorld('owner', {
  getName() {return ownerStore.get("name")},
  setName(value) {ownerStore.set("name", value)},
  getPassword() {return ownerStore.get("friend.secret")},
  setPassword(value) {
    ownerStore.set("friend.secret", value)
    configStore.set("admin", value)
  }
})
