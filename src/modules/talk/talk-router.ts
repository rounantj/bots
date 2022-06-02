import {
  BaseRouterModule,
  ModuleEndPointMap,
} from '../../core/router/base-router-module'
import ResponseHandlers from '../../core/handlers/response'
import { Request, Response } from 'express'
import { TalkService } from './talk-service'
import O2OConversation, {
  IO2OConversation,
} from './o2obots-models/o2obots-conversation'
import {
  IConversation_old,
  IRequestConversation_old,
  IResponseConversation_old,
} from '../teste/teste-interface'
import { ResourceLimits } from 'worker_threads'
import { IO2OChat } from './o2obots-models/o2obots-chat'
import { IO2OProfile } from './o2obots-models/o2obots-profile'

export class TalkRouter extends BaseRouterModule {
  constructor() {
    super('talk')
  }

  protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
    [this.moduleName]: {
      post: [
        // {
        //   endPoint: `${this.getUrlBase()}/sendMessage`,
        //   callback: this.sendMessage,
        //   isProtected: false,
        // },
        {
          endPoint: `${this.getUrlBase()}/loadConversation`,
          callback: this.loadConversation,
          isProtected: false,
        },
      ],
    },
  }

  async loadConversation(
    req: Request,
    res: Response
  ): Promise<IO2OConversation | any> {
    try {
      await O2OConversation.find({
        $or: [
          { id: req.body.idConversation },
          { 'profile.phone': req.body.phone },
          { 'profile.cpf': req.body.cpf },
        ],
      })
        .then((results) => {
          let myConversation: IO2OConversation | any = results[0]
          let chat: IConversation_old | any = []
          for (const k in myConversation.chat) {
            chat.push({
              isAttendant: true,
              message: myConversation.chat[k].questionDesc,
              data: new Date(myConversation.chat.createdAt),
            })
            chat.push({
              isAttendant: false,
              message: myConversation.chat[k].answers,
              data: new Date(myConversation.chat.createdAt),
            })
          }

          let responseConversation: IResponseConversation_old | any = {
            name: myConversation?.profile?.name
              ? myConversation.profile.name
              : 'not found',
            picture: 'none',
            conversation: chat,
          }

          ResponseHandlers.onSuccess(res, responseConversation)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      ResponseHandlers.onError(res, 'Teste de retorno de erro', 'erro-teste')
    }
  }

  // async sendMessage(req: Request, res: Response): Promise<ITeste | any> {
  //   try {
  //     const service = new TesteService().sendMessage(req.body)
  //     ResponseHandlers.onSuccess(res, service)
  //   } catch (error) {
  //     return ResponseHandlers.onError(
  //       res,
  //       'Teste de retorno de erro',
  //       'erro-teste'
  //     )
  //   }
  // }
}
