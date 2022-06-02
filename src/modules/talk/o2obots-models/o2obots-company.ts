import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the Company Schema.
 * @param id:string
 * @param name:string
 */
export interface IO2OCompany extends Document {
  id: string
  name: string
}

const O2OCompanySchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const O2OCompany: Model<IO2OCompany> = model('O2OCompany', O2OCompanySchema)

export default O2OCompany
