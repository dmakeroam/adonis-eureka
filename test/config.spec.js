'use strict'

const test = require('japa')
const { Env, Config } = require('adonis-sink')
const { ioc } = require('@adonisjs/fold')

test.group('Eureka config tests', (group) => {
  
  function createEurekaClient () {
    const Eureka = require('../src/Eureka')
    Eureka.configure()
    return Eureka.client
  }
  
  group.beforeEach(async () => {
    this.env = new Env()
    this.env.set('HOST', 'localhost')
    this.env.set('PORT', 6666)

    ioc.bind('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('eureka', {
        defaultAccessMethod: this.env.get('EUREKA_DEFAULT_ACCESS_METHOD', 'byAppName'),

        server: {
          host: this.env.get('EUREKA_SERVER_HOST', 'localhost'),
          port: this.env.get('EUREKA_SERVER_PORT', 8761),
          servicePath: this.env.get('EUREKA_SERVER_SERVICE_PATH', '/eureka/apps/')
        },

        instance: {
          appName: this.env.get('EUREKA_INSTANCE_APP_NAME', 'AdonisJs Instance'),
          hostname: this.env.get('EUREKA_INSTANCE_HOSTNAME', 'localhost'),
          ipAddr: this.env.get('EUREKA_INSTANCE_IP_ADDRESS', this.env.get('HOST')),
          port: this.env.get('EUREKA_INSTANCE_PORT', this.env.get('PORT')),
          vipAddr: this.env.get('EUREKA_INSTANCE_VIP_ADDRESS', 'adonisjs.instance'),
          dataCenterInfoName: this.env.get('EUREKA_INSTANCE_DATACENTER_INFO_NAME', 'MyOwn')
        }
      })

      return config
    })
  })
  
  test('Uses default config', async (assert) => {
    // Create Eureka client
    let client = createEurekaClient()
    
    // Assert
    assert.equal(client.defaultAccessMethod, 'byAppName')
    assert.equal(client.config.eureka.host, 'localhost')
    assert.equal(client.config.eureka.port, '8761')
    assert.equal(client.config.eureka.servicePath, '/eureka/apps/')
    assert.equal(client.config.instance.app, 'AdonisJs Instance')
    assert.equal(client.config.instance.hostName, 'localhost')
    assert.equal(client.config.instance.port['$'], '6666')
    assert.equal(client.config.instance.vipAddress, 'adonisjs.instance')
    assert.equal(client.config.instance.dataCenterInfo.name, 'MyOwn')
  })
  
  test('Uses env vars', async (assert) => {
    // Setup Env
    this.env.set('EUREKA_DEFAULT_ACCESS_METHOD', 'byVipAddr')
    this.env.set('EUREKA_SERVER_HOST', 'localhost')
    this.env.set('EUREKA_SERVER_PORT', 8761)
    this.env.set('EUREKA_SERVER_SERVICE_PATH', '/eureka/apps/')
    this.env.set('EUREKA_INSTANCE_APP_NAME', 'Cool Instance')
    this.env.set('EUREKA_INSTANCE_VIP_ADDRESS', 'cool.adonisjs')
    this.env.set('EUREKA_INSTANCE_DATACENTER_INFO_NAME', 'Another')

    // Create Eureka client
    let client = createEurekaClient()

    // Assert
    assert.equal(client.defaultAccessMethod, 'byVipAddr')
    assert.equal(client.config.eureka.host, 'localhost')
    assert.equal(client.config.eureka.port, '8761')
    assert.equal(client.config.eureka.servicePath, '/eureka/apps/')
    assert.equal(client.config.instance.app, 'Cool Instance')
    assert.equal(client.config.instance.hostName, 'localhost')
    assert.equal(client.config.instance.port['$'], '6666')
    assert.equal(client.config.instance.vipAddress, 'cool.adonisjs')
    assert.equal(client.config.instance.dataCenterInfo.name, 'Another')
  })
  
})
