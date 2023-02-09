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
  tooltip?: Partial<{
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
  alert?: Partial<{
    root: CSSObject
    variant: {
      [key: string]: {
        root?: CSSObject
        body: string
        main: string
      }
      success: {
        body: string
        main: string
      }
      error: {
        body: string
        main: string
      }
      warning: {
        body: string
        main: string
      }
      info: {
        body: string
        main: string
      }
    }
  }>
  modal?: Partial<{
    root: CSSObject
    foot: CSSObject
    body: CSSObject
    head: CSSObject
    variant: {
      [key: string]: {
        root?: CSSObject
        foot: CSSObject
        body: CSSObject
        head: CSSObject
      }
    }
  }>
  wltPagination?: Partial<{
    root: CSSObject
    icon: {
      icon?: CSSObject
      button?: CSSObject
    }
    disabled: CSSObject
    label: CSSObject
    palette: {
      [T in keyof PaletteTheme]: CSSObject
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
  alert: {
    variant: {
      success: {
        body: '#EEFCF0',
        main: '#51DC6B',
      },
      error: {
        body: '#FEEBEB',
        main: '#FB5758',
      },
      warning: {
        body: '#FFF9EB',
        main: '#FEC124',
      },
      info: {
        body: '#ECF8FE',
        main: '#34B3F1',
      },
    },
  },
}
