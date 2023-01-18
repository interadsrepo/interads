import * as React from 'react'

export interface AlertProps extends React.ComponentPropsWithRef<'dialog'> {
  catchOnCancel?: boolean
  textCancel?: string
  textConfirm?: string
  variant?: 'success' | 'warning' | 'error'
  title: string
  message: string
}
