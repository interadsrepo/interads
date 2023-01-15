import * as React from 'react'

import type { ButtonProps } from './props'
import { IAButton } from './css'

export const Button: React.FC<ButtonProps> = function Button(props: ButtonProps) {
  return (
    <IAButton>
      This is Change
      {props.children}
    </IAButton>
  )
}

export default Button
