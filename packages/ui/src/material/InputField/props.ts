import * as React from 'react'
import { PaletteType } from '../../constant'

export interface InputFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onBlur' | 'onChange'>,
    Pick<
      React.ComponentPropsWithoutRef<'input'>,
      'type' | 'autoFocus' | 'placeholder' | 'disabled'
    > {
  fullWidth?: boolean
  palette?: PaletteType
  variant?: 'normal' | String
  reverse?: boolean
  min?: string
  max?: string
  value?: any
  defaultValue?: any
  label?: string
  readOnly?: boolean
  required?: boolean
  hidden?: boolean
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  iconHelp?: React.ReactNode
  textHelp?: String
  startAddOn?: React.ReactNode
  endAddOn?: React.ReactNode
  status?: 'error' | 'success' | 'info' | 'warning' | null
}
