import { deepClone, mergeDeep } from '@interads/util'
import { Theme, defaultTheme } from './theme'
import { RecursivePartial } from '../global'

const createTheme = (
  incomingTheme: RecursivePartial<Omit<Theme, 'color'>>,
): RecursivePartial<Theme> => {
  const newDefaultTheme = deepClone({ ...defaultTheme })
  const newIncomingTheme = deepClone(incomingTheme)
  const restMerge = mergeDeep(newDefaultTheme, newIncomingTheme)
  return restMerge
}

export default createTheme
