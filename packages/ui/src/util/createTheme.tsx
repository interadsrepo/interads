import {
  amber,
  black,
  blue,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  gray,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from './color'
import { Theme } from './theme'
import { PaletteTheme } from './palette'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export const createTheme = (incomingTheme: RecursivePartial<Omit<Theme, 'color'>>) => {
  const palette: PaletteTheme = {
    primary: '#19223F',
    error: '#FC4549',
    info: '#00C6FF',
    secondary: '#6e30ea',
    success: '#4CAF50',
    warning: '#FFC107',
  }
  const newPalette = palette

  Object.keys(newPalette).forEach((key) => {
    newPalette[key] = incomingTheme.palette?.[key] || newPalette[key]
  })

  return {
    color: {
      amber,
      black,
      blue,
      brown,
      cyan,
      deepOrange,
      deepPurple,
      gray,
      green,
      indigo,
      lightBlue,
      lightGreen,
      lime,
      orange,
      pink,
      purple,
      red,
      teal,
      yellow,
    },
    palette: {
      ...newPalette,
    },
  }
}

export default createTheme
