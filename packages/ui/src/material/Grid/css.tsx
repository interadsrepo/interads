import styled, { css } from 'styled-components'
import * as React from 'react'
import type { GridItemProps, GridProps } from './props'

type IAGridProps = Omit<GridProps, 'variant'> & Required<Pick<GridProps, 'variant'>>

export const IAGrid = styled('div')<IAGridProps>`
  --sig-gap: ${(props) => props.gap || `0rem`};
  --sig-gutter-x: ${(props) => props.spacingX || `0rem`};
  --sig-gutter-y: ${(props) => props.spacingY || `0rem`};
  --sig-breakpoints: ${(props) => props.breakpoints || 12};
  --sig-children: ${(props) => React.Children.count(props.children) || 0};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: var(--sig-gap);
  > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--sig-gutter-x) * 0.5);
    padding-left: calc(var(--sig-gutter-x) * 0.5);
    margin-bottom: var(--sig-gutter-y);
  }
  ${(props) => props.hidden && `display:none;`}
  ${({ theme }) => {
    const customStyle = theme?.grid?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.grid?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`
type IAGridItemProps = Omit<GridItemProps, 'variant'> & Required<Pick<GridItemProps, 'variant'>>

export const IAGridItem = styled('div')<IAGridItemProps>`
  flex: 0 0 auto;
  width: ${(props) => {
    if (props.xs) {
      return `calc(100% * ${props.xs} / var(--sig-breakpoints) - ((1 - ${props.xs} / var(--sig-breakpoints)) * var(--sig-gap)))`
    }
    return `calc(100%)`
  }};
  @media (min-width: 36rem) {
    flex: 0 0 auto;
    width: ${(props) => {
      if (props.sm) {
        return `calc(100% * ${props.sm} / var(--sig-breakpoints) - ((1 - ${props.sm} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.xs) {
        return `calc(100% * ${props.xs} / var(--sig-breakpoints) - ((1 - ${props.xs} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      return `calc(100%)`
    }};
  }
  @media (min-width: 48rem) {
    flex: 0 0 auto;
    width: ${(props) => {
      if (props.md) {
        return `calc(100% * ${props.md} / var(--sig-breakpoints) - ((1 - ${props.md} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.sm) {
        return `calc(100% * ${props.sm} / var(--sig-breakpoints) - ((1 - ${props.sm} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.xs) {
        return `calc(100% * ${props.xs} / var(--sig-breakpoints) - ((1 - ${props.xs} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      return `calc(100%)`
    }};
  }
  @media (min-width: 75rem) {
    flex: 0 0 auto;
    width: ${(props) => {
      if (props.lg) {
        return `calc(100% * ${props.lg} / var(--sig-breakpoints) - ((1 - ${props.lg} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.md) {
        return `calc(100% * ${props.md} / var(--sig-breakpoints) - ((1 - ${props.md} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.sm) {
        return `calc(100% * ${props.sm} / var(--sig-breakpoints) - ((1 - ${props.sm} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.xs) {
        return `calc(100% * ${props.xs} / var(--sig-breakpoints) - ((1 - ${props.xs} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      return `calc(100%)`
    }};
  }
  @media (min-width: 87.5rem) {
    flex: 0 0 auto;
    width: ${(props) => {
      if (props.xl) {
        return `calc(100% * ${props.xl} / var(--sig-breakpoints) - ((1 - ${props.xl} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.lg) {
        return `calc(100% * ${props.lg} / var(--sig-breakpoints) - ((1 - ${props.lg} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.md) {
        return `calc(100% * ${props.md} / var(--sig-breakpoints) - ((1 - ${props.md} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.sm) {
        return `calc(100% * ${props.sm} / var(--sig-breakpoints) - ((1 - ${props.sm} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      if (props.xs) {
        return `calc(100% * ${props.xs} / var(--sig-breakpoints) - ((1 - ${props.xs} / var(--sig-breakpoints)) * var(--sig-gap)))`
      }
      return `calc(100%)`
    }};
  }
  ${({ theme }) => {
    const customStyle = theme?.gridItem?.root
    return customStyle ? css(customStyle) : null
  }}
  ${({ theme, variant }) => {
    const customStyle = theme?.gridItem?.variant?.[variant.toString()]?.root
    return customStyle ? css(customStyle) : null
  }}
`

export default IAGrid
