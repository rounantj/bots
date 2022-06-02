import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the O2OConversation Schema.
 * @param dealId:string
 * @param dealname:string
 * @param hubspot_owner_id:string
 * @param dealtype:string
 * @param dealstage:string
 * @param pipeline:string
 * @param description:string
 */
export interface IO2ODeal extends Document {
  dealId: string
  dealname: string
  hubspot_owner_id: string
  dealtype: string
  dealstage: string
  pipeline: string
  description: string
}

const O2ODealSchema: Schema = new Schema({
  dealId: {
    type: String,
    required: true,
    unique: true,
  },
  dealname: {
    type: String,
    required: true,
  },
  hubspot_owner_id: {
    type: String,
  },
  dealtype: {
    type: String,
  },
  dealstage: {
    type: Number,
  },
  pipeline: {
    type: Number,
  },
  description: {
    type: Number,
  },
})

const O2ODeal: Model<IO2ODeal> = model('O2ODeal', O2ODealSchema)

export default O2ODeal
