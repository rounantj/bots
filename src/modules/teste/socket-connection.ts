import express from 'express'
import { createServer, Server } from 'http'
import * as socketIo from 'socket.io'
import cors from 'cors'
import ResponseConversation, {
  IResponseConversation,
} from './models/response-conversation'
import { IChat } from './models/chat'
import { TesteService } from './teste-service'
import moment from 'moment'

export class O2OSocket {
  public app: express.Application
  public httpServer: Server
  public io: socketIo.Server
  public PORT: number = 3002
  public channel: string = 'message'

  constructor(port: number) {
    this.app = express()
    this.PORT = port

    this.httpServer = createServer(this.app)
    this.io = new socketIo.Server(this.httpServer, { cors: { origin: '*' } })
    this.httpServer.listen(this.PORT, () =>
      console.log(`listenning on ${process.env.SERVER_HOST}:${this.PORT}`)
    )
  }

  public listen(myChannel: string) {
    let socketInstace = this.io

    socketInstace.on('connection', (socket: any) => {
      console.log('a user connected in: ' + myChannel)

      // Save at collecion with "OPENED CHANNELS" to consult after
      let myId = Number(myChannel.split(':')[1])
      let setField = this.setField
      let updateHistory = this.updateHistory
      //socket.join(myChannel)

      socket.on(myChannel, async (msg) => {
        console.log('recebendo mensagen: ', msg)

        await setField('roomOpened', true, myId)
        await setField('room', myChannel, myId)
        // socketInstace.emit(myChannel, 'Obrigado por sua mensagen!')
        let myMsg = {
          question: false,
          text: msg,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        await updateHistory(myMsg, myId)
        // socket.to(to).to(socket.userID).emit(myChannel, message)
      })

      socket.on('disconnect', () => {
        // Remove opened connection from collection "OPENED CONENCTIONS"

        setField('roomOpened', false, myId)
        console.log('user disconnected')
      })
    })
  }
  public async sendResponse(room: string, txt: string, status: string) {
    // Save the sent message on the collection to update the history
    let myId = Number(room.split(':')[1])
    let updateHistory = this.updateHistory
    const service = new TesteService().updateConversation(
      'status',
      status,
      myId
    )

    this.io.emit(room, txt)
    let myMsg = {
      question: true,
      text: txt,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    let result = updateHistory(myMsg, myId)
    return result
  }
  public async updateHistory(chat: any, id: number) {
    const service = await new TesteService().saveMessage(chat, id)
  }
  public async setField(field: string, newValue: any, idClient: number) {
    const service = await new TesteService().updateConversation(
      field,
      newValue,
      idClient
    )
  }
}
