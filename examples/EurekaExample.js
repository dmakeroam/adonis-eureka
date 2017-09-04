'use strict'

const http = require('http')
const Eureka = require('../src/Eureka')
const { ioc } = require('@adonisjs/fold')

// Bind
ioc.bind('Adonis/Src/Config', () => {
  return require('./ConfigProvider')
})

// Eureka Config
Eureka.configure()

// Run Server
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end('{ "Hello": "Hello World!" }')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// Run Eureka
Eureka.start()

