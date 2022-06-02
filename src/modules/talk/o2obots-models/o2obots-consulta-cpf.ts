import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the ConsultaCpf Schema.
 * @param codigoControle:string
 * @param dataConsulta:string
 * @param dataInscricao:string
 * @param horaConsulta:string
 
 */
export interface IO2OConsultaCpf extends Document {
  codigoControle: string
  dataConsulta: string
  dataInscricao: string
  horaConsulta: string
}

const O2OConsultaCpfSchema: Schema = new Schema({
  codigoControle: {
    type: String,
    required: true,
  },
  dataConsulta: {
    type: String,
    required: true,
  },
  dataInscricao: {
    type: String,
    required: true,
  },
  horaConsulta: {
    type: String,
  },
})

const O2OConsultaCpf: Model<IO2OConsultaCpf> = model(
  'O2OConsultaCpf',
  O2OConsultaCpfSchema
)

export default O2OConsultaCpf
