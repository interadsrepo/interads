import * as React from 'react'

import type { InputProps } from './props'
import { IAInput } from './css'

export const Input: React.FC<InputProps> = function Input(props: InputProps) {
  const {
    fullWidth = false,
    hidden = false,
    variant = 'normal',
    palette = 'secondary',
    children,
    className,
    ...rest
  } = props
  return (
    <IAInput
      className={`IAInput-root ${!className ? '' : className}`.trim()}
      fullWidth={fullWidth}
      variant={variant}
      palette={palette}
      hidden={hidden}
      placeholder="Input here.."
      {...rest}
    />
  )
}
export default Input
