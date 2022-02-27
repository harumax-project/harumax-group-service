import { describe } from 'mocha'
import * as chai from 'chai'
import {
  SET_JEDI_GROUP,
  SET_JEDI_GROUP_MEMBERS,
  SET_SAMPLE_GROUP,
} from './samples/group-example'

const assert = chai.assert
const expect = chai.expect

describe('sanitary check', () => {
  it('sanity check', async () => {
    expect(true).to.equal(true)
  })
})
