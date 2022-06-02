const mongoose = require('mongoose')
const { dbHost, dbName, dbUser, dbPass } = require('../config/env/index')

export class MongoConnector {
  constructor() {
    this.loadSchemas()
  }

  sync() {
    try {
      mongoose.set('debug', true)
      return mongoose.connect(
        `mongodb+srv://${dbHost}/${dbName}?retryWrites=true&w=majority`,
        {
          user: dbUser,
          pass: dbPass,
          ssl: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  private loadSchemas(): void {
    console.log('Loading Schemas...')
    console.log('Schemas loaded...')
  }
}
