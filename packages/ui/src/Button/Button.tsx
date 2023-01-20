import * as React from 'react'

import type { ButtonProps } from './props'
import IAButton from './css'

const Button: React.FC<ButtonProps> = function Button(props: ButtonProps) {
  const {
    palette = 'secondary',
    size = 'md',
    fullWidth = false,
    variant = 'normal',
    children,
    className,
    ...rest
  } = props
  return (
    <IAButton
      className={`IAButton-root ${!className ? '' : className}`.trim()}
      palette={palette}
      size={size}
      fullWidth={fullWidth}
      variant={variant}
      {...rest}
    >
      {children}
    </IAButton>
  )
}

export default Button
