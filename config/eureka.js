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
  | Default Access Method
  |--------------------------------------------------------------------------
  |
  | How to access other instances (by the getInstances method).
  | Possible are 'byAppName' or 'byVipAddr'.
  |
  */
  defaultAccessMethod: Env.get('EUREKA_DEFAULT_ACCESS_METHOD', 'byAppName'),
  
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
    host: Env.get('EUREKA_SERVER_HOST', 'localhost'),
    port: Env.get('EUREKA_SERVER_PORT', 8761),
    servicePath: Env.get('EUREKA_SERVER_SERVICE_PATH', '/eureka/apps/'),
    heartbeatInterval: Env.get('EUREKA_SERVER_HEARTBEAT_INTERVAL', 2000),
    registryFetchInterval: Env.get('EUREKA_SERVER_REGISTRY_FETCH_INTERVAL', 2000),
    maxRetries: Env.get('EUREKA_SERVER_MAX_RETRIES', 2)
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
    appName: Env.get('EUREKA_INSTANCE_APP_NAME', 'AdonisJs Instance'),
    hostname: Env.get('EUREKA_INSTANCE_HOSTNAME', 'localhost'),
    ipAddr: Env.get('EUREKA_INSTANCE_IP_ADDRESS', Env.get('HOST')),
    port: Env.get('EUREKA_INSTANCE_PORT', Env.get('PORT')),
    vipAddr: Env.get('EUREKA_INSTANCE_VIP_ADDRESS', 'adonisjs.instance'),
    dataCenterInfoName: Env.get('EUREKA_INSTANCE_DATACENTER_INFO_NAME', 'MyOwn')
  }
}
