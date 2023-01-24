import * as React from 'react'
import { MaterialSize, PaletteType } from '../constant'

export interface IconButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  palette?: PaletteType
  fullWidth?: boolean
  size?: MaterialSize
  variant?: 'normal' | 'outline' | String
}
