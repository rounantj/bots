import express, { Application } from 'express'
import compression from 'compression'
import ResponseHandlers from './handlers/response'
import { RouterModule } from './router/router'
import logger from './providers/logger'
import cors from 'cors'

const pino = require('pino-http')({
  logger: logger,
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
    }),
  },
})

export class CoreModule {
  private _express: Application
  private routerModule: RouterModule

  constructor() {
    this._express = express()
    this.configExpress()
    this.routerModule = new RouterModule(this._express)
    this.router()
  }

  public get express(): Application {
    return this._express
  }

  private getCorsOptions(): cors.CorsOptions {
    return {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'queue-token',
        'Accept',
        'X-Access-Token',
        'Authorization',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      preflightContinue: false,
    }
  }

  private configExpress(): void {
    this._express.disable('x-powered-by')
    this._express.use(cors(this.getCorsOptions()))
    this._express.use(compression())
    this._express.use(express.json({ limit: '5mb' }))
    this._express.use(express.urlencoded({ extended: true }))
    this._express.use(ResponseHandlers.errorHandlerApi)
    this._express.use(pino)
  }

  private router(): void {
    this.routerModule.exposeRoutes()
  }
}
