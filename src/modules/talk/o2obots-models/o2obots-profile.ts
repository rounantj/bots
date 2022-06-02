import { Document, Model, model, Schema } from 'mongoose'
import { IO2OAddress } from './o2obots-address'
import { IO2OConsultaCpf } from './o2obots-consulta-cpf'
import { IO2ODeath } from './o2obots-death'

/**
 * Interface to model the Profile Schema.
 * @param id:number
 * @param phone:string
 * @param address:IO2OAddress
 * @param birthday:string
 * @param codGrauEscolar:number
 * @param consultaCpf:IO2OConsultaCpf
 * @param cpf:string
 * @param death:IO2ODeath
 * @param email:string
 * @param genero:string
 * @param grauEscolar:string
 * @param hubspot_id:string
 * @param income:string
 * @param lgpd:string
 * @param marital_status:string
 * @param marital_status_code:string
 * @param name:string
 * @param nascimentoCidade:string
 * @param nascimentoEstado:string
 * @param nomeMae:string
 * @param nomePai:string
 * @param ourhubspot_id:string
 * @param professional_situation:string
 * @param professional_situation_code:string
 * @param situacao:string
 */
export interface IO2OProfile extends Document {
  id: string
  phone: string
  address: string
  birthday: number
  codGrauEscolar: number
  consultaCpf: string
  cpf: string
  death: string
  email: string
  genero: string
  grauEscolar: string
  hubspot_id: string
  income: string
  lgpd: string
  marital_status: string
  marital_status_code: string
  name: string
  nascimentoCidade: string
  nascimentoEstado: string
  nomeMae: string
  nomePai: string
  ourhubspot_id: string
  professional_situation: string
  professional_situation_code: string
  situacao: string
}

const O2OProfileSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
  },
  birthday: {
    type: String,
  },
  codGrauEscolar: {
    type: String,
  },
  consultaCpf: {
    type: Object,
  },
  cpf: {
    type: String,
  },
  death: {
    type: Object,
  },
  email: {
    type: String,
  },
  grauEscolar: {
    type: String,
  },
  hubspot_id: {
    type: String,
  },
  income: {
    type: String,
  },
  lgpd: {
    type: String,
  },
  marital_status: {
    type: String,
  },
  marital_status_code: {
    type: String,
  },
  name: {
    type: String,
  },
  nascimentoCidade: {
    type: String,
  },
  nascimentoEstado: {
    type: String,
  },
  nomeMae: {
    type: String,
  },
  nomePai: {
    type: String,
  },
  ourhubspot_id: {
    type: String,
  },
  professional_situation: {
    type: String,
  },
  professional_situation_code: {
    type: String,
  },
  situacao: {
    type: String,
  },
})

const O2OProfile: Model<IO2OProfile> = model('O2OProfile', O2OProfileSchema)

export default O2OProfile
