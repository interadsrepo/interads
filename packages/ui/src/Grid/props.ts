import * as React from 'react'
import { BaseLayoutStyleProps } from '../constant'

export interface GridProps extends React.ComponentPropsWithRef<'div'>, BaseLayoutStyleProps {
  breakpoints?: number
  spacingY?: number | string
  spacingX?: number | string
  gap?: number | string
  variant?: String
}

export interface GridItemProps extends React.ComponentPropsWithRef<'div'>, BaseLayoutStyleProps {
  collapse?: boolean
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  variant?: String
}
