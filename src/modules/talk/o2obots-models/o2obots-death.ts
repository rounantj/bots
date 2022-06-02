import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Death Schema.
 * @param bairro:string
 * @param cep:string
 * @param cidade:string
 * @param complemento:string
 * @param estado:string
 * @param logradouro:string
 * @param numero:string
 */
export interface IO2ODeath extends Document {
  anoObito: string
  msgObito: string
}

const O2ODeathSchema: Schema = new Schema({
  anoObito: {
    type: String,
    required: true,
  },
  msgObito: {
    type: String,
    required: true,
  },
})

const O2ODeath: Model<IO2ODeath> = model('O2ODeath', O2ODeathSchema)

export default O2ODeath
