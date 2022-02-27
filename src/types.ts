export type UserInfo = {
  name?: string
  iss: string
  aud: string
  auth_time: number
  user_id: string
  sub: string
  iat: number
  exp: number
  email?: string
  email_verified: boolean
  firebase: {
    identities: { email: string[] }
    sign_in_provider: string
  }
}

import { FieldValue } from 'firebase/firestore'

export type Group = {
  id: string
  name: string
  admin: string
  created_at: FieldValue
  updated_at: FieldValue
}

export type User = {
  id: string
  email: string
  name: string
  status: 'provisioning' | 'approved' | 'denied'
  created_at: FieldValue
  updated_at: FieldValue
}
