import { CorsOptions } from 'cors'

const whitelist = [
  'https://harumax.com',
  'https://www.harumax.com',
  'https://api.harumax.com',
  'https://id.harumax.com',
]

const devWhiteList = [
  'http://localhost:4200',
  'http://localhost:3000',
  'http://localhost:8080',
]

export const CORS_OPTIONS: CorsOptions = {
  origin: function (origin: string | undefined, callback) {
    const isLocalDev =
      process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'localDev'

    const isInDevWhiteList = !origin
      ? true
      : devWhiteList.indexOf(origin) !== -1

    const isInWhiteList = !origin ? true : whitelist.indexOf(origin) !== -1

    if ((isLocalDev && isInDevWhiteList) || !origin) {
      console.log('allowed origin from local development', origin)
      callback(null, true)
    } else if (isInWhiteList || !origin) {
      console.log('allowed origin from ', origin)
      callback(null, true)
    } else {
      console.log('blocked cors', origin)
      callback(new Error('not allowed cors'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  methods: 'GET,PUT,POST,DELETE,UPDATE,PATCH,OPTIONS',
}
