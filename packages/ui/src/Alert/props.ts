import * as React from 'react'

export interface AlertPropsBase extends React.ComponentPropsWithRef<'dialog'> {
  catchOnCancel?: boolean
  textCancel?: string
  textConfirm?: string
  variant?: 'success' | 'warning' | 'error' | 'info'
  option?: {
    type?: 'default' | 'backOnly' | 'doneOnly'
  }
  title: string
  message: string
}
