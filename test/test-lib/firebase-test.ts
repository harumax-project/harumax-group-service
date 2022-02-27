import { FirebaseAdmin } from '../../src/common-lib/firebase-admin'
import { initializeTestEnvironment } from '@firebase/rules-unit-testing'


export const FIREBASE = new FirebaseAdmin()
const projectId = process.env.FIREBASE_PROJECT_ID

/**
 *
 * JUST USE FOR CLEAR FIREBASE DB
 */
export const initTestEnv = async () => {
  return await initializeTestEnvironment({
    projectId,
    firestore: {
      host: '0.0.0.0',
      port: 8080,
    },
  })
}

/**
 * CLEAR DB
 */
export const CLEAR_DB = async () => {
  const testEnv = await initTestEnv()
  await testEnv.clearFirestore()
}
