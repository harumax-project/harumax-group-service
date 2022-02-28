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

/**
 * get groups
 */
app.get('/groups', AUTH_GUARD, async (req, res) => {
})

/**
 * get one group
 */
app.get('/groups/:id', AUTH_GUARD, async (req, res) => {
})

/**
 * get group users
 */
app.get('/groups/users', AUTH_GUARD, async (req, res) => {
})

/**
 * get group user
 */
app.get('/groups/users/:id', AUTH_GUARD, async (req, res) => {
})



app.get('/test', AUTH_GUARD, (req, res) => {
  res.send('welcome to harumax group service!')
})

const port = process.env.PORT || 3100
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
