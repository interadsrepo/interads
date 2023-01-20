import * as React from 'react'
import { TextViewProps } from './props'
import IATextView from './css'
import { getPropStyle } from '../util/helper'

const TextView: React.FC<TextViewProps> = function TextView(props: TextViewProps) {
  const { children, as = 'p', variant = '', className, style, ...rest } = props
  const propStyle: React.CSSProperties = getPropStyle(rest)
  return (
    <IATextView
      className={`IATextView-root ${!className ? '' : className}`.trim()}
      as={as}
      variant={variant}
      style={{ ...propStyle, ...style }}
      {...rest}
    >
      {children}
    </IATextView>
  )
}

export default TextView
