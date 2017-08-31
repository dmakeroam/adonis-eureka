'use strict'

const { ioc } = require('@adonisjs/fold')

class Eureka {  
  static configure () {
    Eureka._client = ioc.make(require('./EurekaConnection'))
  }
  
  static start () {
    Eureka._client.start()
  }
  
  static stop () {
    Eureka._client.stop()
  }
  
  static get client () {
    return Eureka._client
  }
}

module.exports = Eureka
