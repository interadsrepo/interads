import styled, { css } from 'styled-components'
import type { BoxProps } from './props'

type IABoxProps = Required<Pick<BoxProps, 'fullWidth' | 'variant'>>

export const IABox = styled('div')<IABoxProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'max-content')};
  ${(props) => props.hidden && `display:none;`}
  ${({ theme }) => {
    const customStyle = theme?.box?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.box?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
`

export default IABox
