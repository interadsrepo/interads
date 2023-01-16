import styled, { css } from 'styled-components'

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
    `}
`

export default IAButton
