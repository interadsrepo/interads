import styled, { css } from 'styled-components'
import tinycolor from 'tinycolor2'
import type { IconButtonProps } from './props'

type IAIconButtonProps = Required<
  Pick<IconButtonProps, 'palette' | 'fullWidth' | 'size' | 'variant'>
>

const IAIconButton = styled('button')<IAIconButtonProps>`
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.2s ease, filter 0.2s;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'max-content')};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: ${({ size }) => {
    if (size === 'xl') {
      return '1rem 1rem'
    }
    if (size === 'lg') {
      return '0.875rem'
    }
    if (size === 'md') {
      return '0.75rem'
    }
    if (size === 'sm') {
      return '0.625rem'
    }
    return '0.5rem'
  }};
  ${({ theme, palette, variant }) => {
    if (theme) {
      const color = theme.palette?.[palette]
      const lighten = tinycolor(color).lighten(80).toString()
      const secondColor =
        tinycolor.readability(color, lighten) > 2
          ? tinycolor(color).lighten(80).toString()
          : tinycolor(color).darken(30).toString()

      if (variant === 'outline') {
        return css`
          outline: 0.0625rem solid ${color};
          background-color: ${secondColor};
          color: ${color};
        `
      }
      return css`
        background-color: ${color};
        color: ${secondColor};
      `
    }
    return null
  }}
  svg {
    display: block;
    width: ${({ size }) => (size === 'xl' ? '1.5rem' : '1.25rem')};
    height: ${({ size }) => (size === 'xl' ? '1.5rem' : '1.25rem')};
  }
  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(110%);
  }
  &:disabled,
  &[disabled] {
    filter: brightness(100%);
    background-color: #f5f5f5;
    color: #c2c2c2;
    cursor: not-allowed;
    outline: none;
  }
  ${(props) => props.hidden && `display:none;`}
  ${({ theme }) => {
    const customStyle = theme?.iconButton?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.iconButton?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`

export default IAIconButton
