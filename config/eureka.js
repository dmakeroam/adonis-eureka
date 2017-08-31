'use strict'

/*
|--------------------------------------------------------------------------
| Services Configuration
|--------------------------------------------------------------------------
|
| This is general purpose file to define configuration for multiple services.
| The below config is for the eureka provider. Make sure to have it inside
| config/eureka.js available.
|
*/

const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Server Configuration
  |--------------------------------------------------------------------------
  |
  | This is the configuration for the server, which defines how to resolve it.
  | If using Spring Cloud, you may use '/eureka/apps/' as servicePath.
  |
  */
  server: {
    host: Env.get('EUREKA_SERVER_HOST') || 'localhost',
    port: Env.get('EUREKA_SERVER_POST') || 8761,
    servicePath: Env.get('EUREKA_SERVER_SERVICE_PATH') || '/eureka/apps/'
  },
  
  /*
  |--------------------------------------------------------------------------
  | Instance Configuration
  |--------------------------------------------------------------------------
  | 
  | This configuration defines, how the client will be registered on the 
  | eureka server.
  |
  */
  instance: {
    appName: Env.get('EUREKA_INSTANCE_APP_NAME') || 'AdonisJs Instance',
    hostname: Env.get('EUREKA_INSTANCE_HOSTNAME') || 'localhost',
    ipAddr: Env.get('EUREKA_INSTANCE_IP_ADDRESS') || '127.0.0.1',
    port: Env.get('EUREKA_INSTANCE_PORT') || 4444,
    vipAddress: Env.get('EUREKA_INSTANCE_VIP_ADDRESS') || 'adonisjs.instance',
    dataCenterInfoName: Env.get('EUREKA_INSTANCE_DATACENTER_INFO_NAME') || 'MyOwn'
  }
}
