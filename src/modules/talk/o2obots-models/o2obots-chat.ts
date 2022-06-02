import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Chat Schema.
 * @param bairro:string
 * @param cep:string
 * @param cidade:string
 * @param complemento:string
 * @param estado:string
 * @param logradouro:string
 * @param numero:string
 */
export interface IO2OChat extends Document {
  id: string
  createdAt: string
  flowId: string
  questionDesc: string
}

const O2OChatSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  flowId: {
    type: String,
    required: true,
  },
  questionDesc: {
    type: String,
  },
})

const O2OChat: Model<IO2OChat> = model('O2OChat', O2OChatSchema)

export default O2OChat
