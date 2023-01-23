import styled from 'styled-components'
import tinycolor from 'tinycolor2'

import type { CheckBoxProps } from './props'
import checkBoxClasses from './checkboxClasses'

type IACheckBoxProps = Required<Pick<CheckBoxProps, 'palette' | 'size'>>
const IACheckBox = styled('div')<IACheckBoxProps>`
  --border: 2px;
  --border-radius: 6px;
  --size-md: 24px;
  --size-sm: 20px;
  --size-lg: 28px;

  width: var(--size-md);
  aspect-ratio: 1 / 1;
  display: inline-block;

  label {
    cursor: inherit;
    width: 100%;
    height: 100%;
    background-color: ${({ theme, palette }) => theme.palette?.[palette]};
  }

  input {
    position: relative;
    border-width: var(--border);
    border-style: solid;
    border-color: ${({ theme, palette }) => theme.palette?.[palette]};
    border-radius: var(--border-radius);
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    padding: 0;
    color: currentColor;
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    outline: none;

    &::before {
      position: absolute;
      inset: 0;
      z-index: 100;
      content: '';
      clip-path: polygon(2% 59%, 32% 90%, 99% 18%, 91% 12%, 31% 74%, 9% 52%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      background-color: ${({ theme, palette }) =>
        tinycolor(theme.palette?.[palette]).lighten(90).toString()};
      outline: none;
    }
    &::after {
      position: absolute;
      content: '';
      inset: 0;
      z-index: 10;
      background-color: transparent;
    }

    &:checked::before {
      transform: scale(1);
    }

    &:checked::after {
      background-color: ${({ theme, palette }) => theme.palette?.[palette]};
    }
  }

  &.${checkBoxClasses.root} {
  }
  &.${checkBoxClasses.disabled} {
    cursor: not-allowed;
    input {
      cursor: inherit;
      border-color: ${({ theme }) => theme.color?.gray[400]};
      &::before {
        background-color: ${({ theme }) => theme.color?.gray[200]};
      }
      &:checked::after {
        background-color: ${({ theme }) => theme.color?.gray[400]};
      }
    }
  }
  & .${checkBoxClasses.label} {
  }
  & .${checkBoxClasses.input} {
  }
`

export default IACheckBox
