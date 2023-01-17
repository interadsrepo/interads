import styled, { css } from 'styled-components'
import type { InputFieldProps } from './props'

type IAInputFieldProps = Required<
  Pick<InputFieldProps, 'fullWidth' | 'variant' | 'palette' | 'hidden' | 'status' | 'disabled'>
>

export const IAInputField = styled('div')<IAInputFieldProps>`
  --default-color: ${({ theme, status }) => (status ? theme.palette?.[status] : '#c2c2c2')};
  --focus-color: ${({ theme, palette, status }) =>
    status ? theme.palette?.[status] : theme.palette?.[palette]};
  --border-size: ${({ status }) => (status ? '-0.1875rem' : '-0.125rem')};
  --icon-info-color: ${({ theme, status, disabled }) =>
    status && !disabled ? theme.palette?.[status] : '#c2c2c2'};
  --text-info-color: ${({ theme, status, disabled }) =>
    status && !disabled ? theme.palette?.[status] : '#c2c2c2'};
  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
  .IAInputField {
    &-title {
      color: #757575;
      margin: 0 0 0.375rem 0;
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    &-info {
      min-height: 1.25rem;
      color: var(--text-info-color);
      margin: 0.375rem 0 0 0;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
  .IAInputContainer {
    padding: 0;
    background-color: #f5f5f5;
    border-radius: 0.125rem;
    box-shadow: 0 -0.125rem 0 var(--default-color) inset;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    &-addon {
      font-size: 1rem;
      padding: 0.625rem 0.875rem;
      &.start {
        box-shadow: -0.0625rem 0 0 var(--default-color) inset;
        padding-left: 0.75rem;
      }
      &.end {
        box-shadow: 0.0625rem 0 0 var(--default-color) inset;
        padding-right: 0.75rem;
      }
    }
  }
  .IAInputGroup {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    transition: box-shadow 0.125s ease-in-out;
    padding: 0.625rem 0.875rem;
    gap: 0.5rem;
    &-input {
      flex: 1;
      width: 100%;
      padding: 0;
    }
    &-adornment {
      font-size: 1.2rem;
      svg {
        fill: #9e9e9e;
        color: #9e9e9e;
        height: 100%;
        display: block;
        transition: all 0.25s ease-in-out;
      }
    }
    &-info {
      svg {
        fill: var(--icon-info-color);
        color: var(--icon-info-color);
        max-height: 100%;
        display: block;
        transition: all 0.25s ease-in-out;
      }
    }
  }
  &.focused {
    .IAInputContainer {
      box-shadow: 0 -0.1875rem 0 var(--focus-color) inset;
      &-addon {
        &.start {
          box-shadow: -0.0625rem 0 0 var(--focus-color) inset;
        }
        &.end {
          box-shadow: -0.0625rem 0 0 var(--focus-color) inset;
        }
      }
    }
  }
  &:disabled,
  &[disabled] {
    .IAInputContainer {
      background-color: #ededed;
      box-shadow: 0 -0.125rem 0 #c2c2c2 inset;
      &-addon {
        &.start {
          box-shadow: -0.0625rem 0 0 #c2c2c2 inset;
        }
        &.end {
          box-shadow: 0.0625rem 0 0 #c2c2c2 inset;
        }
      }
      color: #c2c2c2;
      cursor: not-allowed;
      outline: none;
    }
  }
  ${(props) => props.hidden && `display:none;`}
  ${({ theme }) => {
    const customStyle = theme?.inputField?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.inputField?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`

export default IAInputField
