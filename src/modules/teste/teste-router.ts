import {
  BaseRouterModule,
  ModuleEndPointMap,
} from '../../core/router/base-router-module'
import ResponseHandlers from '../../core/handlers/response'
import { Request, Response } from 'express'
import { TesteService } from './teste-service'
import { IFirstRequest, IRequestQueue_old, ITeste_old } from './teste-interface'
import RequestConversation, {
  IRequestConversation,
} from './models/request-conversation'
import ResponseConversation, {
  IResponseConversation,
} from './models/response-conversation'
import { decode } from 'jwt-simple'

import * as socketIo from 'socket.io'
import { O2OSocket } from './socket-connection'

const socketConnection = new O2OSocket(Number(process.env.SOCKET_PORT))
export class TesteRouter extends BaseRouterModule {
  constructor() {
    super('teste')
  }

  protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
    [this.moduleName]: {
      post: [
        {
          endPoint: `${this.getUrlBase()}/sendMessage`,
          callback: this.sendMessage,
          isProtected: false,
        },
        {
          endPoint: `${this.getUrlBase()}/loadConversation`,
          callback: this.loadConversation,
          isProtected: false,
        },
        {
          endPoint: `${this.getUrlBase()}/loadQueue`,
          callback: this.loadQueue,
          isProtected: false,
        },
        {
          endPoint: `${this.getUrlBase()}/startRequest`,
          callback: this.startRequest,
          isProtected: false,
        },
      ],
    },
  }
  async loadConversation(
    req: Request,
    res: Response
  ): Promise<IRequestConversation | any> {
    try {
      let clientQueueDetails = decode(
        req.headers['queue-token'].toString(),
        process.env.JWT_SECRET
      )

      let myId = req.body.idClient

      await ResponseConversation.find({
        id: myId,
      })
        .then((results) => {
          ResponseHandlers.onSuccess(res, results)
        })
        .catch((error) => {
          return ResponseHandlers.onError(
            res,
            'Teste de retorno de erro',
            'erro-teste'
          )
        })
    } catch (error) {
      return ResponseHandlers.onError(
        res,
        'Teste de retorno de erro',
        'erro-teste'
      )
    }
  }

  async loadQueue(
    req: Request,
    res: Response
  ): Promise<IRequestConversation | any> {
    try {
      let clientQueueDetails = decode(
        req.headers['queue-token'].toString(),
        process.env.JWT_SECRET
      )

      let myId = req.body.idClient
      console.log(clientQueueDetails)

      await ResponseConversation.find({
        room: { $regex: clientQueueDetails.queue, $options: 'i' },
      })
        .then((results) => {
          ResponseHandlers.onSuccess(res, results)
        })
        .catch((error) => {
          console.log(error)
          return ResponseHandlers.onError(
            res,
            'Teste de retorno de erro',
            'erro-teste'
          )
        })
    } catch (error) {
      console.log(error)
      return ResponseHandlers.onError(
        res,
        'Teste de retorno de erro',
        'erro-teste'
      )
    }
  }

  async startRequest(
    req: Request,
    res: Response
  ): Promise<IFirstRequest | any> {
    try {
      let clientQueueDetails = decode(
        req.headers['queue-token'].toString(),
        process.env.JWT_SECRET
      )

      let clientData: IFirstRequest = req.body

      let socketPort: number = Number(process.env.SOCKET_PORT)
        ? Number(process.env.SOCKET_PORT)
        : 3002
      console.log(clientQueueDetails)
      let channelSocket =
        clientQueueDetails.queue.replace(/ /g, '_') + ':' + clientData.id
      let myHistory: IResponseConversation | any
      await ResponseConversation.find({
        id: clientData.id,
      })
        .then((results) => {
          myHistory = results
        })
        .catch((error) => {
          console.log(error)
        })

      if (myHistory.length > 0) {
      } else {
        let newClient: IResponseConversation = new ResponseConversation(
          clientData
        )
        newClient.save(function (err, book) {
          if (err) return console.error(err)
        })
      }

      socketConnection.listen(channelSocket)

      ResponseHandlers.onSuccess(res, {
        host: `${process.env.SERVER_HOST}:${process.env.SOCKET_PORT}`,
        channel: channelSocket,
      })
    } catch (error) {
      console.log(error)
      return ResponseHandlers.onError(
        res,
        'Teste de retorno de erro',
        'erro-teste'
      )
    }
  }

  async sendMessage(req: Request, res: Response): Promise<ITeste_old | any> {
    try {
      let clientQueueDetails = decode(
        req.headers['queue-token'].toString(),
        process.env.JWT_SECRET
      )

      let room = req.body.room
      let message = req.body.message
      let status = req.body.status
      let service = await socketConnection.sendResponse(room, message, status)

      ResponseHandlers.onSuccess(res, service)
    } catch (error) {
      console.log(error)
      return ResponseHandlers.onError(
        res,
        'Teste de retorno de erro',
        'erro-teste'
      )
    }
  }
}
