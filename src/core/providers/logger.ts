import pino from 'pino'

const { logDisabled } = require('../config/env/index')

const logger = pino({
  enabled: !!logDisabled,
  prettyPrint: {
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'hostname,pid',
  },
})

export default logger
