import styled, { css } from 'styled-components'
import tinycolor from 'tinycolor2'
import { AlertPropsBase } from './props'

type IABoxProps = Required<Pick<AlertPropsBase, 'variant' | 'message'>>

const IAAlert = styled('dialog')<IABoxProps>`
  --alert-width: 18.75rem;
  --alert-height: 21rem;
  --alert-icon-size: 8rem;

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
    /* height: var(--alert-height); */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-between; */
    text-align: center;
    /* padding: 4rem 1.5rem 1.5rem; */
    row-gap: 32px;
    padding: 24px;
    .text {
      margin: 0;
      color: #757575;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.01em;
      font-weight: 400;
    }
    .button {
      flex: 1;
      border: none;
      outline: none;
      border-radius: 0.5rem;
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
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
        border: calc(var(--alert-icon-size) / 18) solid
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
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 8px;
        color: ${(props) => {
          const { variant, theme } = props
          return theme.alert?.variant?.[variant].main
        }};
      }

      & .text-message {
        &::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        max-height: 54px;
        overflow-y: auto;
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
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
          return tinycolor(theme.alert?.variant?.[variant].main || '#00000')
            .brighten(10)
            .toHexString()
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
        background-color: ${tinycolor('#ffffff').brighten(10).toHexString()};
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
          return tinycolor(theme.alert?.variant?.[variant].main || '#00000')
            .brighten(10)
            .toHexString()
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

export default IAAlert
