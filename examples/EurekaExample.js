'use strict'

const http = require('http')
const Eureka = require('../src/Eureka')
const { ioc } = require('@adonisjs/fold')

// Bind
ioc.bind('Adonis/Src/Config', () => {
  const { Config } = require('adonis-sink')
  let config = new Config()
  config.set('eureka', {
    defaultAccessMethod: 'byAppName',

    server: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/'
    },

    instance: {
      appName: 'AdonisJs Instance',
      hostname: 'localhost',
      ipAddr: '127.0.0.1',
      port: 4444,
      vipAddr: 'adonisjs.instance',
      dataCenterInfoName: 'MyOwn'
    }
  })
  
  return config
})

// Consts 
const hostname = 'localhost' 
const ipAddr = '127.0.0.1' 
const port = 4444 

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

