import { deepClone, mergeDeep } from '@interads/util'
import { Theme, defaultTheme } from './theme'
import { RecursivePartial } from '../global'

export const createTheme = (incomingTheme: RecursivePartial<Omit<Theme, 'color'>>) => {
  const newDefaultTheme = deepClone({ ...defaultTheme })
  const newIncomingTheme = deepClone(incomingTheme)
  const restMerge = mergeDeep(newDefaultTheme, newIncomingTheme)
  return restMerge
}

export default createTheme
