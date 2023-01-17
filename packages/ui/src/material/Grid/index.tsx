import * as React from 'react'
import { GridItemProps, GridProps } from './props'
import { IAGrid, IAGridItem } from './css'
import { getPropStyle } from '../../util/helper'

export const Grid: React.FC<GridProps> = function Grid(props: GridProps) {
  const { children, className, variant = '', style, ...rest } = props
  const propStyle: React.CSSProperties = getPropStyle(rest)
  return (
    <IAGrid
      className={`IAGrid-root ${!className ? '' : className}`.trim()}
      variant={variant}
      style={{ ...propStyle, ...style }}
      {...rest}
    >
      {children}
    </IAGrid>
  )
}

export const GridItem: React.FC<GridItemProps> = function GridItem(props: GridItemProps) {
  const { children, className, variant = '', style, ...rest } = props
  const propStyle: React.CSSProperties = getPropStyle(rest)
  return (
    <IAGridItem
      className={`IAGridItem-root ${!className ? '' : className}`.trim()}
      variant={variant}
      style={{ ...propStyle, ...style }}
      {...rest}
    >
      {children}
    </IAGridItem>
  )
}
export default Grid
