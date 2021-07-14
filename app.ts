import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes'

const app = express()

mongoose.connect('mongodb://localhost:27017/compfest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database Connected'))

app.use(cors())
app.use(express.json())
app.use('/', routes)

app.listen(4000)
