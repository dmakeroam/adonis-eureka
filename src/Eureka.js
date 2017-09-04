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
  
  static getInstances (appNameOrVipAddr) {
    if (Eureka._client.defaultAccessMethod === 'byAppName') {
      return Eureka.getInstancesByAppName(appNameOrVipAddr)
    }
    
    return Eureka.getInstancesByVipAddr(appNameOrVipAddr)
  }
  
  static getInstancesByAppName (appName) {
    return Eureka._client.getInstancesByAppId(appName)
  }
  
  static getInstancesByVipAddr (vipAddr) {
    return Eureka._client.getInstancesByVipAddress(vipAddr)
  }
  
  static get client () {
    return Eureka._client
  }
}

module.exports = Eureka
