'use strict'

const http = require('http')
// const Eureka = require('eureka-js-client').Eureka;
const Eureka = require('../src/Eureka')
const { ioc } = require('@adonisjs/fold')

// Bind
ioc.bind('Adonis/Src/Config', () => {
  return require('./ConfigProvider')
})

// Consts
const hostname = 'localhost'
const ipAddr = '127.0.0.1'
const port = 4444

// Eureka Config
Eureka.configure()
/* 
const client = new Eureka({
  // application instance information
  instance: {
    app: 'adonisjs-eureka-example',
    hostName: hostname,
    ipAddr: ipAddr,
    port: {
      '$': port,
      '@enabled': true
    },
    vipAddress: 'adonisjs.eureka.example',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});
*/

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
// client.start()
Eureka.start()

