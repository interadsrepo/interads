import 'styled-components'
import { Theme } from './src/util/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
