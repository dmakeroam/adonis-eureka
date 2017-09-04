'use strict'

class ConfigProvider {
  static get (key) {
    const fakeEurekaConfig = {
      eureka: {
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
          vipAddress: 'adonisjs.instance',
          dataCenterInfoName: 'MyOwn'
        }
      }
    }
    
    let splittedKeys = key.split('.')
    let tempVar = fakeEurekaConfig
    for (let keyPart of splittedKeys) {
      tempVar = tempVar[keyPart]
    }
    console.log(`${key}: ${tempVar}`)
    return tempVar
  }
}

module.exports = ConfigProvider
