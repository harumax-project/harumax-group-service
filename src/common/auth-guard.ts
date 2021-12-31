import { NextFunction, Request, Response } from 'express'
import jwt_decode from 'jwt-decode'
import { UserInfo } from '../types'

export const AUTH_GUARD = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers
  const authentication = headers.authorization
  const apiUserInfo = headers['x-apigateway-api-userinfo']

  if (!authentication || !apiUserInfo) {
    res.status(403)
  }
  const decodedToken = jwt_decode(apiUserInfo as string, { header: true }) as UserInfo
  const isIssSecure = decodedToken.iss === process.env.ISS

  if (!isIssSecure) {
    res.status(403)
  }
  res.locals.decodedToken = decodedToken
  next()
}
