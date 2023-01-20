import * as React from 'react'
import { BoxProps } from './props'
import IABox from './css'
import { getPropStyle } from '../util/helper'

const Box: React.FC<BoxProps> = function Box(props: BoxProps) {
  const { children, fullWidth = false, variant = '', className, style, ...rest } = props
  const propStyle: React.CSSProperties = getPropStyle(rest)
  return (
    <IABox
      className={`IABox-root ${!className ? '' : className}`.trim()}
      fullWidth={fullWidth}
      variant={variant}
      style={{ ...propStyle, ...style }}
      {...rest}
    >
      {children}
    </IABox>
  )
}

export default Box
