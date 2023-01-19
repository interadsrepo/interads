import styled, { css } from 'styled-components'
import type { TextViewProps } from './props'

type IATextViewProps = Required<Pick<TextViewProps, 'variant'>>

export const IATextView = styled('p')<IATextViewProps>`
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
  margin-top: 0;
  ${(props) => props.hidden && `display:none;`}
  ${({ theme }) => {
    const customStyle = theme?.textView?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.textView?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`

export default IATextView
