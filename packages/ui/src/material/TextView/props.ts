import * as React from 'react'
import { BaseDivStyleProps, BaseFontStyleProps, BaseTextStyleProps } from '../../constant'

export interface TextViewProps
  extends React.ComponentPropsWithRef<'p'>,
    BaseTextStyleProps,
    BaseFontStyleProps,
    BaseDivStyleProps {
  as?:
    | 'span'
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'b'
    | 'strong'
    | 'i'
    | 'em'
    | 'mark'
    | 'small'
    | 'del'
    | 'ins'
    | 'sub'
    | 'sup'
  variant?: String
}
