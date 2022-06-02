import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Address Schema.
 * @param text:string
 * @param token:string
 */
export interface IRequestConversation extends Document {
  message: string
  data: string
}

const RequestConversationSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
})

const RequestConversation: Model<IRequestConversation> = model(
  'RequestConversation',
  RequestConversationSchema
)

export default RequestConversation
