import { CSSObject } from 'styled-components'
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
  ColorTheme,
} from './color'
import { PaletteTheme, palette } from './palette'

export interface Theme {
  fontFamily?: string
  color: ColorTheme
  palette: PaletteTheme
  button?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
  iconButton?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
  grid?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
  gridItem?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
  box?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
  textView?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
  input?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
  inputField?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root: CSSObject
      }
    }
  }>
}

export const defaultTheme: Theme = {
  fontFamily: 'sans-serif',
  color: {
    red,
    amber,
    black,
    blue,
    brown,
    cyan,
    deepOrange,
    gray,
    green,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    teal,
    yellow,
    deepPurple,
  },
  palette,
}
