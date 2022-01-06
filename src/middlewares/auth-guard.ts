import { NextFunction, Request, Response } from 'express'
import { FIREBASE } from '..'

export const AUTH_GUARD = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const headers = req.headers
    const authorization = headers.authorization
    const apiUserInfo = headers['x-apigateway-api-userinfo']

    if (!authorization || !apiUserInfo) {
      throw new Error('no headers')
    }

    const idToken = authorization.split(' ')[1] as string
    const checkRevoked = true
    const auth = await FIREBASE.auth
      .verifyIdToken(idToken, checkRevoked)
      .then((decodedToken) => {
        return decodedToken
      })
      .catch((error) => {
        throw new Error(error)
      })

    const isIssSecure = auth.iss === process.env.ISS

    if (!isIssSecure) {
      throw new Error('no iss')
    }

    res.locals.decodedToken = auth

    next()
  } catch (e) {
    console.error(e)
    res.status(403).send({ error: 'Forbidden' })
  }
}
