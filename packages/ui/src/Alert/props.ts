import * as React from 'react'

export interface AlertPropsBase extends React.ComponentPropsWithRef<'dialog'> {
  catchOnCancel?: boolean
  textCancel?: string
  textConfirm?: string
  variant?: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
}
