import express from 'express'
import cors from 'cors'
import { CORS_OPTIONS } from './common/cors-option'
import { AUTH_GUARD } from './common/auth-guard'

const app = express()
app.use(express.json())
app.use(cors(CORS_OPTIONS))

app.get('/', (req, res) => {
  const headers = req.headers
  console.log(headers)
  res.send('welcome to harumax group service!')
})

app.get('/secure', AUTH_GUARD, (req, res) => {
  const headers = req.headers
  console.log(headers)
  console.log(res.locals.decodedToken)
  res.send('welcome to harumax group service!')
})

const port = process.env.PORT || 3100
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
