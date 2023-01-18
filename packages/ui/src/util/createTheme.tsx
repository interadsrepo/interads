import { mergeDeep } from '@interads/util'
import { Theme, defaultTheme } from './theme'
import { RecursivePartial } from '../global'

export const createTheme = (incomingTheme: RecursivePartial<Omit<Theme, 'color'>>) => {
  const newDefaultTheme = { ...defaultTheme }
  return mergeDeep(newDefaultTheme, incomingTheme)
}

export default createTheme
