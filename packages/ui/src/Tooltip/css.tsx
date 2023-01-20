import styled, { css } from 'styled-components'
import { TooltipProps } from './props'

type IATooltipProps = Required<Pick<TooltipProps, 'variant'>>

const IATooltip = styled('div')<IATooltipProps>`
  background: black;
  color: white;
  max-width: 15rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  z-index: 200;
  ${({ theme }) => {
    const customStyle = theme?.tooltip?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.tooltip?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`

export default IATooltip
