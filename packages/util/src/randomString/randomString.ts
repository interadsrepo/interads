import * as cryto from 'node:crypto'

export default function randomString(length = 5, encoding: BufferEncoding = 'hex') {
  return cryto.randomBytes(length).toString(encoding)
}
