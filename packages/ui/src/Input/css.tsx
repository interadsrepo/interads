import styled, { css } from 'styled-components'
import type { InputProps } from './props'

type IAInputProps = Required<Pick<InputProps, 'fullWidth' | 'variant' | 'palette' | 'hidden'>>

const IAInput = styled('input')<IAInputProps>`
  --default-color: #c2c2c2;
  --active-color: ${({ theme, palette }) => theme.palette?.[palette]};
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
  border: none;
  outline: none;
  cursor: auto;
  transition: background 0.2s ease, filter 0.2s;
  min-width: 2rem;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'max-content')};
  font-weight: 400;
  background-color: #f5f5f5;
  line-height: 1.5rem;
  font-size: 1rem;
  border-radius: 0.125rem;
  padding: 0.625rem 0.875rem;
  ::placeholder {
    color: #9e9e9e;
    opacity: 1;
  }
  &:disabled,
  &[disabled] {
    background-color: #ededed;
    color: #c2c2c2;
    cursor: not-allowed;
    outline: none;
  }
  ${({ variant }) =>
    variant === 'normal'
      ? css`
          box-shadow: 0 -0.125rem 0 var(--default-color) inset;
          &:focus,
          &[focus] {
            box-shadow: 0 -0.1875rem 0 var(--active-color) inset;
          }
        `
      : css`
          background-color: transparent;
        `}

  ${(props) => props.hidden && `display:none;`}
  ${({ theme }) => {
    const customStyle = theme?.input?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.input?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`

export default IAInput
