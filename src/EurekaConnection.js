'use strict'

const Eureka = require('eureka-js-client').Eureka;
const { ioc } = require('@adonisjs/fold')

class EurekaConnection extends Eureka {
  static get inject () {
    return ['Adonis/Src/Config']
  }
  
  constructor(Config) {
    super({
      instance: {
        app: Config.get('eureka.instance.appName'),
        hostName: Config.get('eureka.instance.hostname'),
        ipAddr: Config.get('eureka.instance.ipAddr'),
        port: {
          '$': Config.get('eureka.instance.port'),
          '@enabled': true
        },
        vipAddress: Config.get('eureka.instance.vipAddr'),
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: Config.get('eureka.instance.dataCenterInfoName')
        }
      },
      eureka: {
        // eureka server host / port
        host: Config.get('eureka.server.host'),
        port: Config.get('eureka.server.port'),
        servicePath: Config.get('eureka.server.servicePath'),
        heartbeatInterval: Config.get('eureka.server.heartbeatInterval'),
        registryFetchInterval: Config.get('eureka.server.registryFetchInterval'),
        maxRetries: Config.get('eureka.server.maxRetries'),
      }
    })
    
    this.defaultAccessMethod = Config.get('eureka.defaultAccessMethod')
  }
}

module.exports = EurekaConnection
