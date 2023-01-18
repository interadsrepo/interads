import { mergeDeep } from '@interads/util'
import { Theme, defaultTheme } from './theme'
import { RecursivePartial } from '../global'

export const createTheme = (incomingTheme: RecursivePartial<Omit<Theme, 'color'>>) => {
  const daTheme = { ...defaultTheme }
  const iaTheme = { ...incomingTheme }
  const dTheme = JSON.parse(JSON.stringify(daTheme)) as typeof daTheme
  const iTheme = JSON.parse(JSON.stringify(iaTheme)) as typeof iaTheme
  const restMerge = mergeDeep(dTheme, iTheme)
  return restMerge
}

export default createTheme
