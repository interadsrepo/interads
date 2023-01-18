import { deepClone, mergeDeep } from '@interads/util'
import { Theme, defaultTheme } from './theme'
import { RecursivePartial as RP } from '../global'

export const createTheme = (incomingTheme: RP<Omit<Theme, 'color'>>): RP<Theme> => {
  const newDefaultTheme = deepClone({ ...defaultTheme })
  const newIncomingTheme = deepClone(incomingTheme)
  const restMerge = mergeDeep(newDefaultTheme, newIncomingTheme)
  return restMerge
}

export default createTheme
