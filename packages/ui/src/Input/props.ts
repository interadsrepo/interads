import * as React from 'react'
import { PaletteType } from '../constant'

export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  fullWidth?: boolean
  palette?: PaletteType
  hidden?: boolean
  variant?: 'normal' | 'basic' | String
}
