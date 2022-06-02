import O2OConversation, {
  IO2OConversation,
} from './o2obots-models/o2obots-conversation'

export class TalkService {
  constructor() {}

  async loadConversation(idConversation: string) {
    const conversation = await O2OConversation.find({
      id: idConversation,
    })
      .then((results) => {})
      .catch((error) => {
        console.log(error)
      })
    return conversation
  }
}
