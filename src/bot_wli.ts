import { Context, Markup, Telegraf, Telegram } from 'telegraf'
import { Update } from 'typegram'
import dotenv from 'dotenv'
import io, { Socket } from 'socket.io-client'
import { logger } from 'handlebars'
import axios from 'axios'


dotenv.config()
const icons = {
  concluido: '\u{2705}',
  pendente: '\u{2753}',
  um: '\u{0031}\u{20E3}',
  dois: '\u{0032}\u{20E3}',
  tres: '\u{0033}\u{20E3}',
  quatro: '\u{0034}\u{20E3}',
  cinco: '\u{0035}\u{20E3}',
  seis: '\u{0036}\u{20E3}',
  sete: '\u{0037}\u{20E3}',
  oito: '\u{0038}\u{20E3}',
  nove: '\u{0039}\u{20E3}',
  zero: '\u{0030}\u{20E3}',
  correto: '\u{2714}',
  errado: '\u{2716}',
  sim: '\u{1F44D}',
  nao: '\u{1F44E}',
  alegria: '\u{1F64C}',
  setaDireita: '\u{25AB}',
  aponta: '\u{1F449}',
  exclama: '\u{2755}',
  lixo: '\u{26D4}',
  pergunta: '\u{2753}',
}


const token: string = process.env.BOT_TOKEN as string

const telegram: Telegram = new Telegram(token)

const bot: Telegraf<Context<Update>> = new Telegraf(token)

export interface PEOPLES {
  idMsg: number
  conversationId: string,
  status: boolean
  socketStatus: boolean
}
const peoples: PEOPLES[] = []

bot.start(async (ctx) => {
  const chatID = ctx.message.chat.id

  ctx.reply('Olá ' + ctx.from.first_name)
})

bot.help((ctx) => {
  ctx.reply(`Eu sou apenas um bot demonstrativo!`)
})

bot.command('ajuda', (ctx) => {
  ctx.reply(`Eu sou apenas um bot demonstrativo!`)
})
export interface SOCKET_INSTACE{
  id: number,
  socket: any
}
const socketInstances: SOCKET_INSTACE[] = []

function socketInstace(id: number){
  const socket: Socket = io('http://localhost:3002')
   
  let isNew = true, thisInstance: any = null
  socketInstances.forEach(s =>{
    if(id === s.id){
      isNew = false
      thisInstance = s.socket
    }
  })
  if(isNew){
    socketInstances.push({
      id: id,
      socket: socket
    })
    return socket;
  }else{
    return thisInstance
  }
 
}




bot.on('text', async (ctx) => {


  const chatID = ctx.update.message.from.id
  console.log('Recebido mensagem de: ', ctx.update.message.from.first_name, ctx.update.message.from.id)


  let connected = false
  let thisPeople: PEOPLES = {
    idMsg: 0,
    conversationId: '',
    status: false,
    socketStatus: false
  }
  for (const k in peoples) {
    if (peoples[k].idMsg == chatID) {
      connected = true
      thisPeople = peoples[k]
    }
  }
  console.log('esse sou eu => ', thisPeople)

  if (connected) {
    const socket : Socket = socketInstace(ctx.update.message.from.id)
    console.log('estou conectado...', ctx.update.message.from.first_name)
    socket.auth = {
      conversationId: thisPeople.conversationId,
    };
    console.log('emitindo', ctx.message.text, 'to', 'atendente1', ctx.update.message.from.first_name)

    socket.emit('o2o-conversation', {
      content: ctx.message.text,
      to: 'atendente1'
    })
  } else {
    ctx.reply(
      'Olá, eu sou um bot de demonstração da O2OBOTS!\n\nTenho apenas a opção de conecta-lo a um atendente humano no momento!\n\nDeseja falar com um atendente?',
      Markup.inlineKeyboard([
        Markup.button.callback('Sim ' + icons['sim'], 'first'),
        Markup.button.callback('Não ' + icons['nao'], 'second'),
      ])
    )
    bot.action('first', (ctx) => {
      telegram.sendMessage(
        ctx.update.callback_query.from.id,
        'Legal!\n\nVou te transferir para a fila de atendimento do nosso time!\n\nAguarde um momento, em breve será atendido!'
      )
      axios.post('http://localhost:3001/api/v1/conversation/new', {

        "externalId": ctx.update.callback_query.from.id,
        "name": ctx.update.callback_query.from.first_name,
        "picture": "none",
        "status": 0,
        "connected": false,
        "companyToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.IkJBTkNPX0JNRyI.-XfF9FJmb1A6sGP4mW75BTskbfx_BDPx-7xTZznHwc_WVXqCTT6kulwFeyufTc0V4Z3I479XmdiMB9AMlCYZ2A",
        "history": [
          {
            "question": false,
            "text": "Olá sou o " + ctx.update.callback_query.from.first_name + ", quero falar com humano!",
            "date": new Date()
          },
          {
            "question": true,
            "text": "Legal!\n\nVou te transferir para a fila de atendimento do nosso time!\n\nAguarde um momento, em breve será atendido!",
            "date": new Date()
          }
        ],
        "extras": [
          {
            "cnpj": 13123132132,
            "cpf": 1231231231
          }

        ]

      }).then(response => {
        const socket : Socket = socketInstace(ctx.update.callback_query.from.id)

        if (thisPeople.conversationId) {
          socket.auth = {
            conversationId: thisPeople.conversationId,
          };
        } else {
          socket.auth = {
            conversationId: response.data.payload.conversationId,
          };

          peoples.push({
            idMsg: ctx.update.callback_query.from.id,
            socketStatus: true,
            conversationId: response.data.payload.conversationId,
            status: true
          })


          console.log("ouvindo para "+ctx.update.callback_query.from.first_name+" ...")
          socket.on('o2o-conversation', ({ content, from, to }) => {
            console.log('chegou mensagem...', { content, from, to })
            telegram.sendMessage(
              ctx.update.callback_query.from.id,
              content
            )

          })
        }

      }).catch(err => {
        console.log(err)
      })

    })
    bot.action('second', (ctx) => {
      telegram.sendMessage(
        chatID,
        'Tudo bem!\n\nQuando quiser é só me chamar.'
      )
    })
  }


})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
