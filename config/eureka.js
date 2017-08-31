'use strict'

const Env = use('Env')

module.exports = {
  eureka: {
    server: {
      host: Env.get('EUREKA_SERVER_HOST') || 'localhost',
      port: Env.get('EUREKA_SERVER_POST') || 8761,
      servicePath: Env.get('EUREKA_SERVER_SERVICE_PATH') || '/eureka/apps/'
    },
    
    instance: {
      appName: Env.get('EUREKA_INSTANCE_APP_NAME') || 'AdonisJs Instance',
      hostname: Env.get('EUREKA_INSTANCE_HOSTNAME') || 'localhost',
      ipAddr: Env.get('EUREKA_INSTANCE_IP_ADDRESS') || '127.0.0.1',
      port: Env.get('EUREKA_INSTANCE_PORT') || 4444,
      vipAddress: Env.get('EUREKA_INSTANCE_VIP_ADDRESS') || 'adonisjs.instance',
      dataCenterInfoName: Env.get('EUREKA_INSTANCE_DATACENTER_INFO_NAME') || 'MyOwn'
    }
  }
}
