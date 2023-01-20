import * as React from 'react'
import { MaterialSize, PaletteType } from '../constant'

export interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
  palette?: PaletteType
  fullWidth?: boolean
  size?: MaterialSize
  variant?: 'normal' | 'outline' | String
}
