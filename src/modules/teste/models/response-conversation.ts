import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Address Schema.
 * @param id:number
 * @param name:string
 * @param picture:string
 * @param category:string
 * @param status:string
 * @param conversation:IConversation
 */
export interface IResponseConversation extends Document {
  id: number
  name: string
  picture: string
  category: string
  status: string
  room: string
  roomOpened: boolean
  conversation: Object
}

const ResponseConversationSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  roomOpened: {
    type: Boolean,
  },
  room: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  conversation: {
    type: Object,
    required: true,
  },
})

const ResponseConversation: Model<IResponseConversation> = model(
  'conversations',
  ResponseConversationSchema
)

export default ResponseConversation
