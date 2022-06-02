import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Contract Schema.
 * @param fgtsOptIn:string
 * @param fgtsSaqueAniversario:string
 * @param isCorrentista:string
 * @param maxValue:string
 * @param userValue:number
 * @param errors:Array
 */

export interface IO2OContract extends Document {
  fgtsOptIn: boolean
  fgtsSaqueAniversario: boolean
  isCorrentista: boolean
  maxValue: number | null
  userValue: number | null
}

const O2OContractSchema: Schema = new Schema({
  fgtsOptIn: {
    type: Boolean,
    required: true,
  },
  fgtsSaqueAniversario: {
    type: Boolean,
    required: true,
  },
  isCorrentista: {
    type: Boolean,
  },
  maxValue: {
    type: Number,
  },
  userValue: {
    type: Number,
  },
})

const O2OContract: Model<IO2OContract> = model('O2OContract', O2OContractSchema)

export default O2OContract
