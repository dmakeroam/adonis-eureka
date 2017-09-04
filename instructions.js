'use strict'

const path = require('path')
const fs = require('fs')

async function copyConfig (cli) {
  const configPath = path.join(cli.helpers.appRoot(), 'config')
  
  if (fs.existsSync(path.join(configPath, 'eureka.js'))) {
    cli.command.completed('Not copied, already exists', 'config/eureka.js')
    return
  }
  
  try {
    await cli.copy(
      path.join(__dirname, 'config', 'eureka.js'),
      path.join(configPath, 'eureka.js')
    )
    cli.command.completed('Copy', 'config/eureka.js')
  } catch (error) {
    console.log(error)
  }
}

module.exports = async (cli) => {
  await copyConfig(cli)
}
