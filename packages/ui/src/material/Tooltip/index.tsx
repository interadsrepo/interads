/*
 * Usage:
 *
 * A text tooltip is easy, just wrap the element you would like to have a tooltip
 * displayed for and set the content to a string message!
 * <Tooltip content='Hello World!'>
 *   <h1>Stuff and things</h1>
 * </Tooltip>
 *
 * Tooltips can also be jsx elements!
 * <Tooltip content={<img src='https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg' />}>
 *   <h1>Hover for a cat picture!</h1>
 * </Tooltip>
 *
 */

import * as React from 'react'
import { TooltipProps, WindowRegion } from './props'
import { IATooltip } from './css'

function windowRegion(mouseX: number, mouseY: number) {
  const halfHeight = window.window.innerHeight * 0.5
  if (mouseX <= window.window.innerWidth * 0.5) {
    return mouseY <= halfHeight ? WindowRegion.TopLeft : WindowRegion.BottomLeft
  }
  return mouseY <= halfHeight ? WindowRegion.TopRight : WindowRegion.BottomRight
}

export const Tooltip: React.FC<TooltipProps> = function Tooltip(props: TooltipProps) {
  const {
    offsetLeft = 10,
    offsetTop = 10,
    offsetRight = 5,
    offsetBottom = 5,
    children,
    content,
    variant = '',
    className,
  } = props
  const [state, setState] = React.useState({
    x: 0,
    y: 0,
    wndRegion: WindowRegion.TopLeft,
    hidden: true,
  })

  const onMouseMove = (e: React.MouseEvent) => {
    const { hidden } = state
    if (hidden !== true) {
      setState({
        ...state,
        x: e.clientX,
        y: e.clientY,
      })
    }
  }

  const onMouseEnter = (e: React.MouseEvent) => {
    setState({
      ...state,
      hidden: false,
      wndRegion: windowRegion(e.clientX, e.clientY),
    })
  }

  const onMouseleave = () => {
    setState({ ...state, hidden: true })
  }

  const computeStyle = (): React.CSSProperties => {
    const { wndRegion, x, y } = state
    if (x <= 0 && y <= 0) {
      return {
        display: 'none',
      }
    }
    switch (wndRegion) {
      case WindowRegion.TopLeft:
        return {
          position: 'fixed',
          left: `${x + offsetLeft}px`,
          top: `${y + offsetTop}px`,
        }
      case WindowRegion.TopRight:
        return {
          position: 'fixed',
          zIndex: 200000,
          right: `${window.window.innerWidth - x + offsetRight}px`,
          top: `${y + offsetTop}px`,
        }
      case WindowRegion.BottomLeft:
        return {
          position: 'fixed',
          zIndex: 200000,
          left: `${x + offsetLeft}px`,
          bottom: `${window.window.innerHeight - y + offsetBottom}px`,
        }
      case WindowRegion.BottomRight:
        return {
          position: 'fixed',
          zIndex: 200000,
          right: `${window.window.innerWidth - x + offsetRight}px`,
          bottom: `${window.window.innerHeight - y + offsetBottom}px`,
        }
      default:
        return {
          position: 'fixed',
          zIndex: 200000,
          right: `${window.window.innerWidth - x + offsetRight}px`,
          bottom: `${window.window.innerHeight - y + offsetBottom}px`,
        }
    }
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseleave} onMouseMove={onMouseMove}>
      {children}
      {!state.hidden && (
        <IATooltip
          variant={variant}
          className={`IATooltip-root ${className}`}
          style={computeStyle()}
        >
          {content}
        </IATooltip>
      )}
    </div>
  )
}

export default Tooltip
