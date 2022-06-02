import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Address Schema.
 * @param bairro:string
 * @param cep:string
 * @param cidade:string
 * @param complemento:string
 * @param estado:string
 * @param logradouro:string
 * @param numero:string
 */
export interface IO2OAddress extends Document {
  bairro: string
  cep: string
  cidade: string
  complemento: string
  estado: string
  logradouro: string
  numero: string
}

const O2OAddressSchema: Schema = new Schema({
  bairro: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  complemento: {
    type: String,
  },
  estado: {
    type: String,
    required: true,
  },
  logradouro: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
})

const O2OAddress: Model<IO2OAddress> = model('O2OAddress', O2OAddressSchema)

export default O2OAddress
