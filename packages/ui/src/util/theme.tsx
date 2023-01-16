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
  color: ColorTheme
  palette: PaletteTheme
}

export const defaultTheme: Theme = {
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
