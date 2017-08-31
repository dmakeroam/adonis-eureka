'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class EurekaProvider extends ServiceProvider {
  register () {
    this.app.bind('MigFrankfurt/Adonis/Eureka', () => require('../src/Eureka'))
  }
  
  boot () {
    const Eureka = this.app.use('MigFrankfurt/Adonis/Eureka')
    Eureka.configure()
  }
}

module.exports = EurekaProvider
