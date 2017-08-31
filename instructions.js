'use strict'

const path = require('path')

async function copyConfig (cli) {
  const configPath = path.join(cli.helpers.appRoot(), 'config')
  try {
    await cli.copy(
      path.join(__dirname, 'config', 'eureka.js'),
      path.join(configPath, 'eureka.js')
    )
    cli.command.completed('Copy', 'config/eureka.js')
  } catch (error) {
    consoloe.log(error)
  }
}

module.exports = async (cli) => {
  await copyConfig(cli)
}
