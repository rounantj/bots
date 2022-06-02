import { Document, Model, model, Schema } from 'mongoose'
import { IO2OCompany } from './o2obots-company'
import { IO2OContract } from './o2obots-contract'
import { IO2ODeal } from './o2obots-deal'
import { IO2OProfile } from './o2obots-profile'

/**
 * Interface to model the O2OConversation Schema.
 * @param id:string
 * @param password:string
 * @param createdAt:string
 * @param createdAtLocale:string
 * @param flowId:number
 * @param lastFlowId:number
 * @param profile:IO2OProfile
 * @param company:IO2OCompany
 * @param deal:IO2ODeal
 * @param dealHistory:Array
 * @param contract:IO2OContract
 * @param updatedAt:string
 * @param updatedAtLocale:string
 * @param chat:string
 */
export interface IO2OConversation extends Document {
  id: string
  createdAt: string
  createdAtLocale: string
  flowId: number
  lastFlowId: number
  profile: IO2OProfile
  company: IO2OCompany
  deal: IO2ODeal
  dealHistory: []
  contract: IO2OContract
  updatedAt: string
  updatedAtLocale: string
  chat: string
}

const O2OConversationSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  createdAtLocale: {
    type: String,
  },
  flowId: {
    type: Number,
  },
  profile: {
    type: Object,
  },
  company: {
    type: Object,
  },
  deal: {
    type: Object,
  },
  dealHistory: {
    type: [],
  },
  contract: {
    type: Object,
  },
  updatedAt: {
    type: String,
  },
  updatedAtLocale: {
    type: String,
  },
  chat: {
    type: Object,
  },
})

const O2OConversation: Model<IO2OConversation> = model(
  'conversations_copy',
  O2OConversationSchema
)

export default O2OConversation
