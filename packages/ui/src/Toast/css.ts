import styled from 'styled-components'
import tinycolor from 'tinycolor2'

const IAToast = styled('div')`
  --toast-width: 22rem;
  --toast-height: 4.875rem;

  box-sizing: border-box;
  position: fixed;
  z-index: 999999999999999999999999;
  right: 1rem;
  top: 1rem;
  animation: toast-in-right 0.7s;

  .toast-notification .icon {
    display: block;
    fill: currentColor;
    color: #ffffff;
  }

  .toast-notification .text {
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0.01em;
    margin-block-end: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    width: calc(var(--toast-width) - 10rem);
    color: #ffffff;
  }

  .toast-notification .button {
    padding: 0;
    font-size: 1.25rem;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }

  .toast-notification {
    background: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    pointer-events: auto;
    overflow: hidden;
    padding: 1.5rem;
    width: var(--toast-width);
    max-height: 4.875rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.625rem #999;
    opacity: 0.8;
    background-position: 0.938rem;
    background-repeat: no-repeat;
    transition: 0.3s ease;
    margin-block-end: 1rem;
    animation: toast-in-right 0.7s;
  }

  .toast-notification.info {
    background: ${({ theme }) => theme.palette?.info};
  }

  .toast-notification.success {
    background: ${({ theme }) => theme.palette?.success};
  }

  .toast-notification.error {
    background: ${({ theme }) => theme.palette?.error};
  }

  .toast {
    height: var(--toast-height);
    width: var(--toast-width);
  }

  .toast-notification:hover {
    box-shadow: 0 0 0.75rem ${() => tinycolor('#ffffff').setAlpha(0.8).toString()};
    opacity: 1;
    cursor: pointer;
  }

  .toast-notification .toast-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
  }

  .toast-notification .toast-icon .icon {
    font-size: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }

  .toast-icon {
    svg {
      fill: #ffffff;
    }
  }

  .toast-notification .toast-information {
    font-family: inherit;
    flex: 1;
  }

  .toast-notification .toast-information .text-toast-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .toast-notification .toast-information .text-toast-desc {
    font-size: 0.85rem;
    font-weight: 300;
    margin: 0;
  }

  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (min-width: 36rem) {
    --toast-width: 30rem;
    --toast-height: 4.875rem;
  }

  @media (min-width: 48rem) {
    --toast-width: 37.5rem;
    --toast-height: 4.875rem;
  }
`

export default IAToast
