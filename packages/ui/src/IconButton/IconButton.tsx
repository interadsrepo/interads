import * as React from 'react'

import type { IconButtonProps } from './props'
import IAIconButton from './css'

const IconButton: React.FC<IconButtonProps> = function IconButton(props: IconButtonProps) {
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
    <IAIconButton
      className={`IAIconButton-root ${!className ? '' : className}`.trim()}
      palette={palette}
      size={size}
      fullWidth={fullWidth}
      variant={variant}
      {...rest}
    >
      {children}
    </IAIconButton>
  )
}

export default IconButton
