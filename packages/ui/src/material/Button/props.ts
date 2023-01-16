import * as React from 'react'
import { PaletteType } from '../../constant'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  palette?: PaletteType
}
