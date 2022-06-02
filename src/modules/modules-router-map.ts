import { TesteRouter } from './teste/teste-router'
import { TalkRouter } from './talk/talk-router'

export interface FeaturedModuleRouter {
  moduleName: any
  parser: string
}

export class ModulesRouterMapper {
  public registeredModules: Array<FeaturedModuleRouter> = [
    {
      moduleName: TesteRouter,
      parser: 'getRoutesFromModules',
    },
    {
      moduleName: TalkRouter,
      parser: 'getRoutesFromModules',
    },
  ]
}
