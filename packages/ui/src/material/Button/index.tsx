import * as React from 'react'

import type { ButtonProps } from './props'
import { IAButton } from './css'

export const Button: React.FC<ButtonProps> = function Button(props: ButtonProps) {
  const { palette = 'primary', children, className, ...rest } = props
  return (
    <IAButton
      className={`IAButton-root ${!className ? '' : className}`.trim()}
      palette={palette}
      {...rest}
    >
      {children}
    </IAButton>
  )
}

export default Button
