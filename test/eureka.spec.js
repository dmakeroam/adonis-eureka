'use strict'

const test = require('japa')
const { Env, Config } = require('adonis-sink')
const { ioc } = require('@adonisjs/fold')
const sleep = require('system-sleep')

test.group('Eureka connection tests', (group) => {

  function createTestClient () {
    const EurekaJs = require('eureka-js-client').Eureka
    const client = new EurekaJs({
      instance: {
        app: 'test-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
          '$': 5555,
          '@enabled': true
        },
        vipAddress: 'test.service',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        }
      },
      eureka: {
        host: '127.0.0.1',
        port: 8761,
        servicePath: '/eureka/apps/'
      }
    })
    
    return client
  }

  group.beforeEach(async () => {
    this.env = new Env()
    this.env.set('HOST', 'localhost')
    this.env.set('PORT', 6666)

    ioc.bind('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('eureka', {
        defaultAccessMethod: 'byAppName',

        server: {
          host: 'localhost',
          port: 8761,
          servicePath: '/eureka/apps/',
          heartbeatInterval: 2000,
          registryFetchInterval: 2000,
          maxRetries: 2,
        },

        instance: {
          appName: 'AdonisJs Instance',
          hostname: 'localhost',
          ipAddr: this.env.get('HOST'),
          port: this.env.get('PORT'),
          vipAddr: 'adonisjs.instance',
          dataCenterInfoName: 'MyOwn'
        }
      })

      return config
    })
  })
  
  test('Can establish connection to Eureka (needs running Eureka instance)', async (assert) => {
    // Configure 
    const Eureka = require('../src/Eureka')
    Eureka.configure()
    let client = Eureka.client

    // Pre assert
    assert.equal(Object.keys(client.cache.app).length, 0)
    assert.equal(Object.keys(client.cache.vip).length, 0)

    // Connect to Eureka
    Eureka.start()

    // Sleep
    sleep(2000)

    // Assert
    assert.isAbove(Object.keys(client.cache.app).length, 0)
    assert.isAbove(Object.keys(client.cache.vip).length, 0)
    
    // Stop
    Eureka.stop()
    sleep(1000)
  }).timeout(5000)
  
  test('Can get other instances (needs running Eureka instance)', async (assert) => {
    // Start other instance
    const otherClient = createTestClient()
    otherClient.start()
    sleep(4000)
    
    // Configure 
    const Eureka = require('../src/Eureka')
    Eureka.configure()
    let client = Eureka.client
    
    // Pre assert
    assert.equal(Object.keys(client.cache.app).length, 0)
    assert.equal(Object.keys(client.cache.vip).length, 0)
    
    // Connect to Eureka
    Eureka.start()
    
    // Sleep
    sleep(2000)
    
    // getInstances (byAppName)
    let instances = Eureka.getInstances('test-service')
    assert.equal(instances[0].vipAddress, 'test.service')
    instances = null
    
    // getInstancesByAppName
    instances = Eureka.getInstancesByAppName('test-service')
    assert.equal(instances[0].vipAddress, 'test.service')
    instances = null
    
    // getInstances (byVipAddr)
    client.defaultAccessMethod = 'byVipAddr'
    instances = Eureka.getInstances('test.service')
    assert.equal(instances[0].app, 'TEST-SERVICE')
    instances = null
    
    // getInstancesByVipAddr
    instances = Eureka.getInstancesByVipAddr('test.service')
    assert.equal(instances[0].app, 'TEST-SERVICE')
    instances = null
    
    otherClient.stop()
    Eureka.stop()
    sleep(1000)
  }).timeout(9000)

})

