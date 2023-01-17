import * as React from 'react'
import { BaseDisplayStyleProps, BaseDivStyleProps, BaseLayoutStyleProps } from '../../constant'

export interface BoxProps
  extends React.ComponentPropsWithRef<'div'>,
    BaseLayoutStyleProps,
    BaseDivStyleProps,
    BaseDisplayStyleProps {
  fullWidth?: boolean
  variant?: String
}
