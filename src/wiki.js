require('coffeescript/register')
const path = require('path')
const farm = require("wiki/farm")
const {config, owner} = require("./config.js")

const wiki = farm(config.store)
console.log("wiki HERE!", {config: config.store, owner: owner.store})
