'use strict'

async function copyConfig (cli) {
  try {
    console.log(`cli.configDir: ${cli.configDir}`)
  } catch (error) {
    consoloe.log(error)
  }
}
