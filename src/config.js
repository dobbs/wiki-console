const path = require('path')
const envPaths = require("env-paths")
const Conf = require("conf")

const userData = envPaths("wiki-console", {suffix:""}).data
const serialize = value => JSON.stringify(value, null, 2)

const owner = new Conf({
  configName: "owner",
  cwd: userData,
  serialize,
  defaults: {
    name: "Author",
    friend: {secret: "Change Me"}
  }
})

const config = new Conf({
  configName: "config",
  cwd: userData,
  serialize,
  defaults: {
    "farm": true,
    "data": path.join(userData, "data"),
    "root": path.join(require.resolve("wiki-server"), ".."),
    "port": 5400,
    "security_type": "friends",
    "secure_cookie": false,
    "cookieSecret": Array
      .from({length:4}, ()=>(Math.random()*10e17).toString(36))
      .join(""),
    "session_duration": 36500,
    "wikiDomains": {
      "localhost": {
        "id": owner.path
      }
    },
    "admin": owner.get("friends.secret")
  }
})

module.exports = {config, owner, serialize}
