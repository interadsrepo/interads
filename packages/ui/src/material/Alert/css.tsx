import styled, { css } from 'styled-components'
import { hexToHsl } from '../../util/helper'
import { AlertProps } from './props'

type IABoxProps = Required<Pick<AlertProps, 'variant' | 'message'>>

const StyledAlert = styled('dialog')<IABoxProps>`
  --alert-width: 25rem;
  --alert-height: 30rem;
  --alert-icon-size: 11rem;
  background: ${(props) => {
    const { variant, theme } = props
    return theme.alert?.variant?.[variant].body
  }};
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
  border: none;
  outline: none;
  border-radius: 2rem;
  padding: 0;

  &::backdrop {
    backdrop-filter: blur(0.375rem);
    background-blend-mode: exclusion;
    background: rgba(0, 0, 0, 0.5);
  }

  &[open] {
    animation: scale-up 250ms forwards, fade-in 125ms forwards;
  }

  &[closing] {
    display: block;
    pointer-events: none;
    inset: 0;
    animation: fade-out 250ms forwards, scale-down 200ms forwards;
  }

  .alert {
    width: var(--alert-width);
    height: var(--alert-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding: 4rem 1.5rem 1.5rem;

    .icon {
      display: block;

      & polyline {
        stroke: #ffffff;
      }

      & line {
        stroke: #ffffff;
      }

      ${(props) => {
        const { variant } = props
        if (variant === 'error') {
          return css`
            & circle:last-child {
              fill: white;
            }
          `
        }

        return null
      }}

      ${(props) => {
        const { variant } = props
        if (variant === 'warning') {
          return css`
            & circle:nth-child(3) {
              fill: #ffffff;
            }

            & path {
              stroke: #ffffff;
            }
          `
        }

        return null
      }}
    }

    .text {
      margin-block-end: 0;
      font-weight: 500;
      color: #757575;
      font-size: 1rem;
    }

    .button {
      flex: 1;
      border: none;
      outline: none;
      border-radius: 0.8rem;
      padding: 0.5rem 2rem;
      font-size: 1rem;
      font-weight: 500;
      background: #ffffff;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    &-box-icon {
      position: relative;
      width: var(--alert-icon-size);
      height: var(--alert-icon-size);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s ease;

      &::before {
        position: absolute;
        content: '';
        inset: 0;
        border-radius: 50%;
        background: #ffffff;
        border: 0.625rem solid
          ${(props) => {
            const { variant, theme } = props
            return theme.alert?.variant?.[variant].main
          }};
        z-index: -1;
        transition: all 0.5s ease;
      }

      & .icon,
      svg {
        color: ${(props) => {
          const { variant, theme } = props
          return theme.alert?.variant?.[variant].main
        }};
        fill: ${(props) => {
          const { variant, theme } = props
          return theme.alert?.variant?.[variant].main
        }};
        font-size: var(--alert-icon-size);
      }
    }

    &-box-message {
      width: 100%;

      & .text-title {
        margin-block-end: 0.5rem;
        font-weight: 600;
        font-size: 2rem;
        color: ${(props) => {
          const { variant, theme } = props
          return theme.alert?.variant?.[variant].main
        }};
      }
    }

    &-box-action {
      width: 100%;
      display: flex;
      align-items: stretch;
      gap: 0.5rem;
      flex-wrap: wrap;

      & .btn-view {
        background-color: ${(props) => {
          const { variant, theme } = props
          return theme.alert?.variant?.[variant].main
        }};
        color: #ffffff;
      }

      & .btn-view:hover {
        background-color: ${(props) => {
          const { variant, theme } = props
          return hexToHsl(theme.alert?.variant?.[variant].main || '#00000', 10)
        }};
      }

      & .btn-cancel {
        color: ${(props) => {
          const { variant, theme } = props
          return theme.alert?.variant?.[variant].main
        }};
        background-color: #ffffff;
      }

      & .btn-cancel:hover {
        background-color: ${hexToHsl('#ffffff', 10)};
      }

      & .btn-next {
        background-color: ${(props) => {
          const { variant, theme } = props
          return theme.alert?.variant?.[variant].main
        }};
        color: #ffffff;
      }

      & .btn-next:hover {
        background-color: ${(props) => {
          const { variant, theme } = props
          return hexToHsl(theme.alert?.variant?.[variant].main || '#00000', 10)
        }};
      }
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes scale-up {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes scale-down {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  ${({ theme }) => {
    const customStyle = theme?.alert?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.alert?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`

export default StyledAlert
