import * as http from 'http'
import { CoreModule } from '../core/core'
import logger from '../core/providers/logger'
import { Application } from 'express'

const { serverPort } = require('../core/config/env')

export class Server {
  private db: any
  private app: Application

  constructor(databaseConnector) {
    if (databaseConnector) {
      this.db = databaseConnector
      this.app = new CoreModule().express
      this.syncDB()
    }
  }

  private async syncDB() {
    try {
      const syncData = await this.db.sync()
      this.dbSyncHandler(syncData)
    } catch (error) {
      this.dbSyncErrorHandler(error)
    }
  }

  private dbSyncHandler(dbInfo: any) {
    logger.debug(dbInfo)
    this.upServer()
  }

  private dbSyncErrorHandler(error: any) {
    logger.error(`Failed on connect database: ${error}`)
    this.upServer()
  }

  private upServer() {
    http
      .createServer(this.app)
      .listen(serverPort)
      .on('listening', this.onServerUp.bind(this, serverPort))
      .on('error', this.onServerStartUpError.bind(this))
  }

  private onServerUp(port: Number) {
    logger.info(`Server up and running on port: ${port} `)
  }

  private onServerStartUpError(error: any) {
    logger.error(`Error: ${error}`)
  }
}
