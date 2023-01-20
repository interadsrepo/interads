export enum WindowRegion {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}
export interface TooltipProps {
  content: any
  variant?: String
  className?: string
  children?: React.ReactNode
  offsetLeft?: number
  offsetRight?: number
  offsetTop?: number
  offsetBottom?: number
}
