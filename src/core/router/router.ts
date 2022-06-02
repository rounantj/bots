import { Application } from 'express'
import { RouterModuleFactory } from './router-map'
import { HttpVerbMap, FeatureModuleRouterInfo } from './base-router-module'

export class RouterModule {
  private routerFactory: RouterModuleFactory
  private express: Application

  constructor(app: Application) {
    this.express = app
    this.routerFactory = new RouterModuleFactory()
  }

  public exposeRoutes(): void {
    const registeredModules = this.routerFactory.getRegisteredModules()
    if (registeredModules && Array.isArray(registeredModules)) {
      registeredModules.forEach(this.extractRouterInfoFromModule.bind(this))
    }
  }

  private extractRouterInfoFromModule(routerfeatModule: HttpVerbMap) {
    if (routerfeatModule) {
      const registeredVerbs = Object.keys(routerfeatModule)
      registeredVerbs.forEach(
        this.extractInfoByVerb.bind(this, routerfeatModule)
      )
    }
  }

  private extractInfoByVerb(
    routerfeatModule: HttpVerbMap,
    registeredVerb: string
  ) {
    routerfeatModule[registeredVerb].forEach(
      this.mountRoutes.bind(this, registeredVerb)
    )
  }

  private mountRoutes(
    registeredVerb: string,
    routerInfo: FeatureModuleRouterInfo
  ) {
    if (routerInfo) {
      const { callback, endPoint } = routerInfo
      this.express.route(endPoint)[registeredVerb](callback)
    }
  }
}
