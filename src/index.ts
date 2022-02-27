import express from 'express'
import cors from 'cors'
import { CORS_OPTIONS } from './middlewares/cors-option'
import { AUTH_GUARD } from './middlewares/auth-guard'
import { FirebaseAdmin } from './common-lib/firebase-admin'

export const FIREBASE = new FirebaseAdmin()

const app = express()
app.use(express.json())
app.use(cors(CORS_OPTIONS))

app.get('/', (req, res) => {
  res.send('welcome to harumax group service!')
})

app.get('/hoge', async (req, res) => {
  res.send('welcome to harumax group service!')
})

app.get('/test', AUTH_GUARD, (req, res) => {
  console.log(res.locals.decodedToken)
  res.send('welcome to harumax group service!')
})

const port = process.env.PORT || 3100
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
