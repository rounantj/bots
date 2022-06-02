import { IChat } from './models/chat'
import ResponseConversation, {
  IResponseConversation,
} from './models/response-conversation'
import {
  ITeste_old,
  IResponseConversation_old,
  IRequestConversation_old,
} from './teste-interface'

export class TesteService {
  constructor() {}

  async saveMessage(chat: IChat, idClient: number) {
    await ResponseConversation.updateOne(
      { id: idClient },
      { $push: { conversation: chat } }
    )
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error
      })
  }

  async updateConversation(field: string, newValue: any, idClient: number) {
    try {
      await ResponseConversation.updateOne(
        { id: idClient },
        { [field]: newValue },
        (err, data) => {}
      )
    } catch (error) {}
  }

  getConversation(): ITeste_old {
    const teste: ITeste_old = {
      name: 'Renan',
      email: 'renan@renan.com',
      phoneNumber: '999999',
    }
    return teste
  }
}
