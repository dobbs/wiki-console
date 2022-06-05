const {fork} = require('child_process')
const path = require('path')

console.log("spike", {parent:"HERE"})

const P = fork(path.join(__dirname, "./wiki.js"))

console.log("spike", {parent: "forked"})
