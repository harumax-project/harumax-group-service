import { serverTimestamp } from 'firebase/firestore'
import { Group, User } from '../../src/types'
import { FIREBASE } from '../test-lib/firebase-test'

const currentTime = FIREBASE.getCurrentTimestamp()
// const currentTime = serverTimestamp()
/**
 * sample group
 */
export const SAMPLE_GROUP: Group = {
  id: 'SAMPLE',
  name: 'SAMPLE',
  admin: 'logged_in_user',
  created_at: currentTime,
  updated_at: currentTime,
}

/**
 * JEDI GROUP
 */
export const JEDI_GROUP: Group = {
  id: 'JEDI',
  name: 'JEDI',
  admin: 'yoda',
  created_at: currentTime,
  updated_at: currentTime,
}

/**
 * JEDI MEMBERS
 * yoda, obiwan is member
 * luke is provisioning
 */
export const JEDI_MEMBERS: User[] = [
  {
    id: 'yoda',
    name: 'yoda',
    email: 'yoda',
    status: 'approved',
    created_at: currentTime,
    updated_at: currentTime,
  },
  {
    id: 'obiwan',
    name: 'obiwan',
    email: 'obiwan',
    status: 'approved',
    created_at: currentTime,
    updated_at: currentTime,
  },
  {
    id: 'luke',
    name: 'luke',
    email: 'luke',
    status: 'provisioning',
    created_at: currentTime,
    updated_at: currentTime,
  },
]

export const SAMPLE_MEMBERS: User[] = [
  {
    id: 'logged_in_user',
    name: 'logged_in_user',
    email: 'logged_in_user',
    status: 'approved',
    created_at: currentTime,
    updated_at: currentTime,
  },
]

/**
 * SETS SAMPLE GROUP
 */
export const SET_SAMPLE_GROUP = async () => {
  const db = FIREBASE.db
  const groupSnapShot = db.collection('groups').doc('SAMPLE')
  await groupSnapShot.set(SAMPLE_GROUP)
  const groupUsersSnapShot = db
    .collection('groups/SAMPLE/users')
    .doc('logged_in_user')
  await groupUsersSnapShot.set(SAMPLE_MEMBERS[0])
}

/**
 * SETS JEDI GROUP
 */
export const SET_JEDI_GROUP = async () => {
  const yodaDB = FIREBASE.db
  const groupSnapShot = yodaDB.collection('groups').doc('JEDI')
  await groupSnapShot.set(JEDI_GROUP)
  const groupUsersSnapShot = yodaDB.collection('groups/JEDI/users').doc('yoda')
  await groupUsersSnapShot.set(JEDI_MEMBERS[0])
}

/**
 * SETS JEDI MEMBERS
 */
export const SET_JEDI_GROUP_MEMBERS = async () => {
  const yodaDB = FIREBASE.db
  const JEDI_ONLY_MEMBERS = JEDI_MEMBERS.slice(1)
  for (const member of JEDI_ONLY_MEMBERS) {
    const snapshot = yodaDB.collection('groups/JEDI/users').doc(`${member.id}`)
    await snapshot.set(member)
  }
}
