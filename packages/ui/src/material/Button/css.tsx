import styled, { css } from 'styled-components'
import tinycolor from 'tinycolor2'
import type { ButtonProps } from './props'

type IAButtonProps = Required<Pick<ButtonProps, 'palette'>>

export const IAButton = styled('button')<IAButtonProps>`
  border: none;
  outline: none;
  font: inherit;
  text-transform: uppercase;
  cursor: pointer;

  ${({ theme, palette }) =>
    theme &&
    css`
      background-color: ${theme.palette?.[palette]};
      color: ${tinycolor(theme.palette?.[palette]).lighten(80).toString()};
    `}
`

export default IAButton
