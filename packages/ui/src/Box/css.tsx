import styled, { css } from 'styled-components'
import type { BoxProps } from './props'

type IABoxProps = Required<Pick<BoxProps, 'fullWidth' | 'variant'>>

const IABox = styled('div')<IABoxProps>`
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
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
`

export default IABox
