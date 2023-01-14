import * as React from 'react'

import type { ButtonProps } from './props'
import { IAButton } from './styled'

export const Button: React.FC<ButtonProps> = function Button(props: ButtonProps) {
  return (
    <IAButton>
      This is Button
      {props.children}
    </IAButton>
  )
}

export default Button
