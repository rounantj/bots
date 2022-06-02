import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Address Schema.
 * @param question:boolean
 * @param text:string
 * @param date:string
 */
export interface IChat extends Document {
  question: boolean
  text: string
  date: string
}

const ChatSchema: Schema = new Schema({
  question: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
})

const Chat: Model<IChat> = model('Chat', ChatSchema)

export default Chat
