import styled from 'styled-components'
import tinycolor from 'tinycolor2'

const IAToast = styled('div')`
  --toast-width: 22rem;
  --toast-height: 4.875rem;
  --action-width: 50px;
  --toast-gap: 10px;
  --toast-padding: 12px;

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  box-sizing: border-box;
  position: fixed;
  z-index: 99999999999999999999;
  right: 1rem;
  top: 1rem;
  pointer-events: none;
  animation: toast-in-right 0.7s;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

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
    background: #fff;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    pointer-events: auto;
    overflow: hidden;
    /* padding: 1.5rem; */
    width: var(--toast-width);
    max-height: 4.875rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.625rem #999;
    opacity: 0.9;
    background-position: 0.938rem;
    background-repeat: no-repeat;
    transition: 0.3s ease;
    animation: toast-in-right 0.7s;
  }

  .toast-notification.open {
    border-radius: 0.25rem 0.25rem 0 0;
    box-shadow: none;
    opacity: 1;
  }

  .toast-expand {
    background: transparent;
    pointer-events: auto;
    width: var(--toast-width);
    margin-block-end: 1rem;
    border-radius: 0 0 0.25rem 0.35rem;
    overflow: hidden;
    height: 0;

    .textExpand {
      color: #fff;
      font-weight: 400;
      line-height: 1.5;
      font-size: 12px;
      margin: 0;
    }
  }

  .toast-expand.open {
    padding: 12px;
    height: 100%;
  }

  .toast-expand.info,
  .toast-notification.info {
    background: ${({ theme }) => theme.palette?.info};
  }

  .toast-expand.success,
  .toast-notification.success {
    background: ${({ theme }) => theme.palette?.success};
  }

  .toast-expand.error,
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

  .toast-notification.open:hover {
    box-shadow: none;
    opacity: 1;
    cursor: auto;
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

  .toast-action {
    display: flex;
    column-gap: 10px;
    width: var(--action-width);
    min-width: 60px;
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
