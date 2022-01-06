import { NextFunction, Request, Response } from 'express'
import jwt_decode from 'jwt-decode'
import { UserInfo } from '../types'

export const AUTH_GUARD = function (
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
    const decodedToken = jwt_decode(apiUserInfo as string, {
      header: true,
    }) as UserInfo
    const isIssSecure = decodedToken.iss === process.env.ISS

    if (!isIssSecure) {
      throw new Error('no iss')
    }
    res.locals.decodedToken = decodedToken
    next()
  } catch (e) {
    console.log(e)
    res.status(403).send({ error: 'Forbidden' })
  }
}
