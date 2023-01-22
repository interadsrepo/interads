import * as React from 'react'
import { MaterialSize, PaletteType } from '../constant'

type ReactInput = Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'type'>
type Size = Exclude<MaterialSize, 'xs' | 'xl'>

export interface CheckBoxProps extends ReactInput {
  palette?: PaletteType
  size?: Size
  variant?: 'normal'
}
