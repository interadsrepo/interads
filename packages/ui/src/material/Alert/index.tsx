import { FC } from 'react'

import type { AlertProps } from './props'
import { IAAlert } from './styled'

export const Alert: FC<AlertProps> = function Alert(props: AlertProps) {
  return (
    <IAAlert>
      This Is Alert
      {props.children}
    </IAAlert>
  )
}

export default Alert
