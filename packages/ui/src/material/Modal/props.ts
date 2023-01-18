import * as React from 'react'
import { BaseLayoutStyleProps, BaseTextStyleProps, MaterialSize, PaletteType } from '../../constant'

export interface ModalProps extends React.ComponentPropsWithRef<'dialog'> {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  scroll?: 'body' | 'content'
  variant?: 'normal' | String
  disabled?: boolean
  size?: MaterialSize
  palette?: PaletteType
  round?: string | boolean
  outline?: string | boolean
}
export interface ModalHeadProps
  extends React.ComponentPropsWithoutRef<'div'>,
    BaseTextStyleProps,
    BaseLayoutStyleProps {
  flex?: boolean
}
export interface ModalFootProps
  extends React.ComponentPropsWithoutRef<'div'>,
    BaseTextStyleProps,
    BaseLayoutStyleProps {
  flex?: boolean
}
export interface ModalBodyProps
  extends React.ComponentPropsWithoutRef<'div'>,
    BaseTextStyleProps,
    BaseLayoutStyleProps {
  flex?: boolean
}
