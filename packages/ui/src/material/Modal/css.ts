import styled, { css } from 'styled-components'
import tinycolor from 'tinycolor2'
import { ModalProps, ModalHeadProps, ModalFootProps, ModalBodyProps } from './props'

type ComponentProps = Required<
  Pick<
    ModalProps,
    | 'variant'
    | 'disabled'
    | 'fullWidth'
    | 'open'
    | 'scroll'
    | 'size'
    | 'round'
    | 'outline'
    | 'palette'
    | 'onClick'
    | 'variant'
  >
>
export default styled('dialog')<ComponentProps>`
  --modal-variant: ${({ variant }) => variant.toString()};
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(0.25rem);
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (!props.open ? 'hidden' : 'visible')};
  & .modal-container {
    overflow-y: auto;
    ${(props) => {
      if (!props.fullWidth) {
        if (props.scroll === 'content' || props.fullWidth) {
          return `
          outline: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
        `
        }
        return `
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
        `
      }
      return `
        display: block;
      `
    }}
    height: 100%;
    outline: 0;
    opacity: ${(props) => (!props.open ? '0' : '1')};
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    & .modal-content {
      margin: ${(props) => (props.fullWidth ? '0' : '2rem')};
      ${(props) => {
        if (props.scroll === 'content' || props.fullWidth) {
          return css`
            max-height: ${props.fullWidth ? `100%` : `calc(100% - 4rem)`};
            height: ${props.fullWidth ? `100%` : `auto`};
            position: relative;
            display: flex;
            flex-direction: column;
          `
        }
        return css`
          position: relative;
          display: flex;
          flex: 0 1 auto;
          flex-direction: column;
        `
      }}
      max-width: ${(props) => {
        const { size, fullWidth } = props
        if (fullWidth) {
          return '100%'
        }
        if (size === 'xs') {
          return '24.281rem'
        }
        if (size === 'sm') {
          return '37.5rem'
        }
        if (size === 'lg') {
          return '75rem'
        }
        if (size === 'xl') {
          return '80rem'
        }
        return '56.25rem'
      }};
      width: ${({ fullWidth }) => (fullWidth ? '100%' : 'calc(100% - 4rem)')};
      background-color: none;
      border-radius: ${({ round }) => {
        if (round) {
          if (typeof round === 'string') {
            return round
          }
          return '0.5rem'
        }
        return 'inherit'
      }};
      ${({ theme, outline, palette }) =>
        outline &&
        `outline: solid ${theme.palette?.[palette]} ${
          typeof outline === 'string' ? outline : `0.0625rem`
        }`};
      .modal-head {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        border-bottom: 0.063rem solid #e0e0e0;
        padding: 0.675rem 1rem 0.675rem 1rem;
        background-color: ${({ theme, palette }) => theme.palette?.[palette]};
        color: ${({ theme, palette }) => {
          const color = theme.palette?.[palette]
          const lighten = tinycolor(color).lighten(80).toString()
          const secondColor =
            tinycolor.readability(color, lighten) > 2
              ? tinycolor(color).lighten(80).toString()
              : tinycolor(color).darken(30).toString()
          return secondColor
        }};
        ${({ theme }) => {
          const customStyle = theme?.modal?.head
          return customStyle ? css(customStyle) : null
        }}
        ${({ theme, variant }) => {
          const customStyle = theme?.modal?.variant?.[variant.toString()]?.head
          return customStyle ? css(customStyle) : null
        }}
      }
      .modal-foot {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        border-top: 0.063rem solid #e0e0e0;
        text-align: left;
        padding: 0.675rem 1rem 0.675rem 1rem;
        background-color: ${(props) => {
          const { palette, theme, variant } = props
          if (variant === 'fill') {
            return theme.palette?.[palette]
          }
          return '#ffffff'
        }};
        ${({ theme }) => {
          const customStyle = theme?.modal?.foot
          return customStyle ? css(customStyle) : null
        }}
        ${({ theme, variant }) => {
          const customStyle = theme?.modal?.variant?.[variant.toString()]?.foot
          return customStyle ? css(customStyle) : null
        }}
      }
      .modal-body {
        color: ${({ theme, color }) => (color ? theme.color[color] : 'inherit')};
        padding: 1rem;
        text-align: left;
        background-color: #ffffff;
        ${({ theme }) => {
          const customStyle = theme?.modal?.body
          return customStyle ? css(customStyle) : null
        }}
        ${({ theme, variant }) => {
          const customStyle = theme?.modal?.variant?.[variant.toString()]?.body
          return customStyle ? css(customStyle) : null
        }}
        ${(props) =>
          props.scroll === 'content' || props.fullWidth
            ? css`
                overflow-y: auto;
                box-shadow: 0 0.938rem 0.938rem -1.313rem rgba(0, 0, 0, 0.75) inset,
                  0 -0.938rem 0.938rem -1.313rem rgba(0, 0, 0, 0.75) inset;
              `
            : null}
        height: ${(props) => (props.fullWidth ? '100%' : 'auto')};
      }
      ${({ theme }) => {
        const customStyle = theme?.modal?.root
        return customStyle ? css(customStyle) : null
      }}
      ${({ theme, variant }) => {
        const customStyle = theme?.modal?.variant?.[variant.toString()]?.root
        return customStyle ? css(customStyle) : null
      }}
    }
  }
`
export const IUModalHead = styled('div')<ModalHeadProps>`
  color: ${({ theme, color }) => (color ? theme.color[color] : 'inherit')};
`
export const IUModalFoot = styled('div')<ModalFootProps>`
  color: ${({ theme, color }) => (color ? theme.color[color] : 'inherit')};
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      flex-warp: warp;
      gap: 1rem;
    `}
`
export const IUModalBody = styled('div')<ModalBodyProps>`
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      gap: 1rem;
    `}
`
