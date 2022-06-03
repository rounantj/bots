import { Server } from './server'
import { MongoConnector } from './core/database/mongoConnector'
import O2OConversation from './modules/talk/o2obots-models/o2obots-conversation'
import ResponseConversation from './modules/teste/models/response-conversation'
import { encode, decode } from 'jwt-simple'
;(function () {
  new Server(new MongoConnector())
  console.log(
    encode(
      {
        company: 'Banco BGM',
        queue: 'ATENDIMENTO-NIVEL-01',
        id: 8888,
      },
      process.env.JWT_SECRET
    )
  )
})()
