import * as React from 'react'

type CustomIcon = {
  className: string
}

export interface AlertPropsBase extends React.ComponentPropsWithRef<'dialog'> {
  catchOnCancel?: boolean
  textCancel?: string
  textConfirm?: string
  variant?: 'success' | 'warning' | 'error' | 'info'
  option?: {
    type?: 'default' | 'backOnly' | 'doneOnly'
    icon?: React.ReactElement<CustomIcon>
  }
  title: string
  message: string
}
