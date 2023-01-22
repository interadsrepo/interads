import styled, { css } from 'styled-components'
import tinycolor from 'tinycolor2'
import { WLTPaginationProps } from '../props/wltPaginationProps'
import { gray } from '../../util'

const defaultColor = {
  bg: gray[200],
  color: gray[500],
}

type IAWLTPaginationProps = Required<Pick<WLTPaginationProps, 'palette'>>
const IAWLTPagination = styled('div')<IAWLTPaginationProps>`
  --border: 1px;
  --border-radius: 4px;

  &.IAWTLPagination-root {
    display: flex;
    align-items: center;
    height: 36px;
    width: max-content;
    border-radius: var(--border-radius);
    column-gap: 4px;
    margin-block: 10px;

    ${({ theme }) => {
      const customStyle = theme?.wltPagination?.root
      return customStyle ? css(customStyle) : null
    }}
  }

  & .IAWTLPagination-icon {
    height: 100%;
    aspect-ratio: 1 / 1;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: calc(var(--border) + var(--border-radius));
    transition: background 0.25s ease;
    &:nth-child(1),
    &:nth-child(2) {
      .IAWTLPagination-icon-icon {
        transform: rotate(180deg);
      }
    }

    &.IAWTLPagination-palette {
      &primary {
        stroke: ${({ theme }) => theme.palette.primary};
        background: ${defaultColor.bg};
        &:active {
          filter: brightness(110%);
        }
        &:hover {
          background-color: ${tinycolor(defaultColor.bg).darken(5).toHexString()};
        }
        ${({ theme }) => {
          const customStyle = theme?.wltPagination?.palette?.primary
          return customStyle ? css(customStyle) : null
        }}
      }
      &secondary {
        stroke: ${({ theme }) => theme.palette.secondary};
        background: ${defaultColor.bg};
        &:active {
          filter: brightness(110%);
        }
        &:hover {
          background-color: ${tinycolor(defaultColor.bg).darken(5).toHexString()};
        }
        ${({ theme }) => {
          const customStyle = theme?.wltPagination?.palette?.secondary
          return customStyle ? css(customStyle) : null
        }}
      }
      &success {
        stroke: ${({ theme }) => theme.palette.success};
        background: ${defaultColor.bg};
        &:active {
          filter: brightness(110%);
        }
        &:hover {
          background-color: ${tinycolor(defaultColor.bg).darken(5).toHexString()};
        }
        ${({ theme }) => {
          const customStyle = theme?.wltPagination?.palette?.success
          return customStyle ? css(customStyle) : null
        }}
      }
      &error {
        stroke: ${({ theme }) => theme.palette.error};
        background: ${defaultColor.bg};
        &:active {
          filter: brightness(110%);
        }
        &:hover {
          background-color: ${tinycolor(defaultColor.bg).darken(5).toHexString()};
        }
        ${({ theme }) => {
          const customStyle = theme?.wltPagination?.palette?.error
          return customStyle ? css(customStyle) : null
        }}
      }
      &info {
        stroke: ${({ theme }) => theme.palette.info};
        background: ${defaultColor.bg};
        &:active {
          filter: brightness(110%);
        }
        &:hover {
          background-color: ${tinycolor(defaultColor.bg).darken(5).toHexString()};
        }
        ${({ theme }) => {
          const customStyle = theme?.wltPagination?.palette?.info
          return customStyle ? css(customStyle) : null
        }}
      }
      &warning {
        stroke: ${({ theme }) => theme.palette.warning};
        background: ${defaultColor.bg};
        &:active {
          filter: brightness(110%);
        }
        &:hover {
          background-color: ${tinycolor(defaultColor.bg).darken(5).toHexString()};
        }
        ${({ theme }) => {
          const customStyle = theme?.wltPagination?.palette?.warning
          return customStyle ? css(customStyle) : null
        }}
      }
    }

    ${({ theme }) => {
      const customStyle = theme?.wltPagination?.icon?.button
      return customStyle ? css(customStyle) : null
    }}

    &.IAWTLPagination-iconDisabled {
      background: transparent;
      border-width: 1px;
      border-style: solid;
      border-color: ${defaultColor.color};
      stroke: ${defaultColor.color};
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }

      transition: background 0.25s ease;

      ${({ theme }) => {
        const customStyle = theme?.wltPagination?.disabled
        return customStyle ? css(customStyle) : null
      }}
    }
  }

  & .IAWTLPagination-label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    margin: 0;
    letter-spacing: 0.05em;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 400;
    padding-inline: 0.5rem;
    color: ${({ theme }) => theme.palette.primary};

    span {
      font-weight: 600;
    }

    ${({ theme }) => {
      const customStyle = theme?.wltPagination?.label
      return customStyle ? css(customStyle) : null
    }}
  }

  font: 100% ${({ theme }) => (theme.fontFamily ? theme.fontFamily : 'inherit')};
`

export default IAWLTPagination
